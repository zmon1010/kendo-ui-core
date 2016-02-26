require('erb')
require_relative('codegen/lib/options')
require_relative('codegen/lib/markdown_parser')
require_relative('codegen/lib/component')

JSCHEME_DOC_TEMPLATE_CONTENTS = File.read(File.join(File.dirname(__FILE__), "jscheme.js.erb"))
JSCHEME_DOC_TEMPLATE = ERB.new JSCHEME_DOC_TEMPLATE_CONTENTS, 0, '%<>'

module CodeGen::Jscheme
    class Component < CodeGen::Component

        def real_class?
            @name =~ /[A-Z]\w+$/
        end

        def plugin
            'kendo' + "" + @name
        end

        def method_class
            Method
        end

        def methods
            @methods.find_all { |m| !m.name.include?('.') }
        end

        def redirect
            "_#{full_name.downcase.gsub('.', '_')}"
        end

        def namespace
            @full_name.sub('.' + @name, '')
        end
    end

    class Method < CodeGen::Method

        def parameters
            @parameters.find_all { |p| !p.name.include?('.') }
        end

        def parameter_class
            Parameter
        end
    end

    class Parameter < CodeGen::Parameter
        def jscheme_type
            return 'Object' if @type.size > 1
            @type[0]
        end
    end
end

def get_jscheme(sources)

    classes = sources.map do |source|
        parser = CodeGen::MarkdownParser.new

        File.open(source, 'r:bom|utf-8') do |file|
            parser.parse(file.read, CodeGen::Jscheme::Component)
        end
    end

    classes.sort! {|a, b| a.full_name <=> b.full_name }

    JSCHEME_DOC_TEMPLATE.result(binding)
end

class JschemeTask < Rake::FileTask
    include Rake::DSL
    def execute(args=nil)
        mkdir_p File.dirname(name), :verbose => false

        $stderr.puts("Creating #{name}") if VERBOSE

        File.open(name, "w") do |file|
            file.write get_jscheme(prerequisites)
        end
    end
end

def jscheme(*args, &block)
    JschemeTask.define_task(*args, &block)
end

namespace :jscheme do
    %w(master production).each do |branch|
        namespace branch do
            desc "Test .jscheme generation"
            task :test do
                File.open("dist/kendo.jscheme-#{branch}.js", "w") do |f|
                    f.write get_jscheme(md_api_suite('all'))
                    sh "node_modules/jshint/bin/jshint #{f.path}"
                end
            end
        end
    end
end
