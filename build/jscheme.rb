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
COMPOSITE = ERB.new File.read("build/codegen/lib/jscheme/composite_option.json.erb"), 0, '%<>'
ARRAY = ERB.new File.read("build/codegen/lib/jscheme/array_option.json.erb"), 0, '%<>'

module CodeGen::Jscheme
    module Options
        def option_class
            Option
        end

        def composite_option_class
            CompositeOption
        end

        def array_option_class
            ArrayOption
        end
    end 

    class Component < CodeGen::Component
        include Options
        def jscheme_class
            JSON.pretty_generate(JSON.parse(COMPONENT.result(binding)))
        end

        def namespace
            @full_name.sub('.' + @name, '')
        end
    end

    class Option < CodeGen::Option
        include Options
        def jscheme_def
            OPTION.result(binding)
        end
    end

    class ArrayOption < CodeGen::ArrayOption
        include Options
        def jscheme_def
            ARRAY.result(binding)
        end
    end

    class CompositeOption < CodeGen::CompositeOption
        include Options
        def jscheme_def
            COMPOSITE.result(binding)
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
                schemas = get_jscheme(md_api_suite('all')).split("__SEPARATOR__")
                begin
                    schemas.each do |schema|
                        id = JSON.parse(schema)["id"].split(".").last
                        File.open("dist/json-scheme/#{id}.json", "w+") do |f|
                            f.write schema
                        end
                    end
                rescue JSON::ParserError
                    puts "Parsing failed"
                end
            end
        end
    end
end
