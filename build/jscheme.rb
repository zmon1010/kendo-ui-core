require('erb')
require_relative('codegen/lib/options')
require_relative('codegen/lib/markdown_parser')
require_relative('codegen/lib/component')

JSCHEME_DOC_TEMPLATE_CONTENTS = File.read(File.join(File.dirname(__FILE__), "/codegen/lib/jscheme/jscheme.json.erb"))
JSCHEME_DOC_TEMPLATE = ERB.new JSCHEME_DOC_TEMPLATE_CONTENTS, 0, '%<>'
COMPONENT = ERB.new File.read("build/codegen/lib/jscheme/component.json.erb"), 0, '%<>'

module CodeGen::Jscheme
    class Component < CodeGen::Component

        def real_class?
            @name =~ /[A-Z]\w+$/
        end
       
        def options
            @methods.find_all { |m| !m.name.include?('.') }
        end

        def jscheme_class
            Component.result(binding)
        end

        def namespace
            @full_name.sub('.' + @name, '')
        end
    end

    class Option < CodeGen::Option

    end
end

def get_jscheme(sources)

    components = sources.map do |source|
        parser = CodeGen::MarkdownParser.new

        File.open(source, 'r:bom|utf-8') do |file|
            parser.parse(file.read, CodeGen::Jscheme::Component)
        end
    end

    components.sort! {|a, b| a.full_name <=> b.full_name }

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
