require('erb')
require('json')
require_relative('codegen/lib/options')
require_relative('codegen/lib/option')
require_relative('codegen/lib/composite_option')
require_relative('codegen/lib/markdown_parser')
require_relative('codegen/lib/component')

JSCHEME_DOC_TEMPLATE_CONTENTS = File.read(File.join(File.dirname(__FILE__), "/codegen/lib/jscheme/jscheme.json.erb"))
JSCHEME_DOC_TEMPLATE = ERB.new JSCHEME_DOC_TEMPLATE_CONTENTS, 0, '%<>'

COMPONENT = ERB.new File.read("build/codegen/lib/jscheme/component.json.erb"), 0, '%<>'
OPTION = ERB.new File.read("build/codegen/lib/jscheme/option.json.erb"), 0, '%<>'

module CodeGen::Jscheme
    module Options

        def option_class
            Option
        end

        def composite_option_class
            CompositeOption
        end

    end 

    class Component < CodeGen::Component
        include Options
        def jscheme_class
            #COMPONENT.result(binding)
            JSON.pretty_generate(JSON.parse(COMPONENT.result(binding).gsub(/\r\n/,"")))
        end

        def options
            @options.find_all { |option| !option.composite? }.sort {|a, b| a.name <=> b.name }
        end

        def namespace
            @full_name.sub('.' + @name, '')
        end
    end

    class Option < CodeGen::Option
        def jscheme_def
            OPTION.result(binding)
        end

    end

    class CompositeOption < CodeGen::CompositeOption
        def jscheme_def
            OPTION.result(binding)
        end
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
                end
            end
        end
    end
end
