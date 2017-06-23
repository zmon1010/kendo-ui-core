require('erb')
require('fileutils')

require_relative('codegen/lib/options')
require_relative('codegen/lib/option')
require_relative('codegen/lib/composite_option')
require_relative('codegen/lib/markdown_parser')
require_relative('codegen/lib/component')

REACT_TEMPLATE_CONTENTS = File.read(File.join(File.dirname(__FILE__), "/codegen/lib/react/contents.erb"))
REACT_TEMPLATE = ERB.new REACT_TEMPLATE_CONTENTS, 0, '%<>'

REACT_COMPONENT = ERB.new File.read("build/codegen/lib/react/component.tsx.erb"), 0, '%<>'
REACT_OPTION = ERB.new File.read("build/codegen/lib/react/option.tsx.erb"), 0, '%<>'
REACT_COMPOSITE = ERB.new File.read("build/codegen/lib/react/composite_option.tsx.erb"), 0, '%<>'
REACT_COMPOSITE_DEF = ERB.new File.read("build/codegen/lib/react/composite_option_def.tsx.erb"), 0, '%<>'
REACT_ARRAY = ERB.new File.read("build/codegen/lib/react/array_option.tsx.erb"), 0, '%<>'
REACT_PACKAGE_TEMPLATE = ERB.new File.read("build/codegen/lib/react/package.json.erb"), 0, '%<>'
REACT_TS_TEMPLATE = ERB.new File.read("build/codegen/lib/react/tsconfig.json.erb"), 0, '%<>'
REACT_INDEX_TS_TEMPLATE = ERB.new File.read("build/codegen/lib/react/index.json.erb"), 0, '%<>'

module CodeGen::React
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

    module Array
        def item_class
            ArrayItem
        end
    end

    class Component < CodeGen::Component
        include Options
        def react_class
            REACT_COMPONENT.result(binding)
        end

        def namespace
            @full_name.sub('.' + @name, '')
        end
    end

    class Option < CodeGen::Option
        include Options
        def react_def
            REACT_OPTION.result(binding)
        end
    end

    class CompositeOption < CodeGen::CompositeOption
        include Options

        def react_def
            REACT_COMPOSITE_DEF.result(binding)
        end
    end

    class ArrayOption < CodeGen::ArrayOption
        include Array
        def react_def
            REACT_ARRAY.result(binding)
        end
    end

    class ArrayItem < CompositeOption
    end
end

def get_react(component)
    REACT_TEMPLATE.result(binding)
end

def get_package(component)
    REACT_PACKAGE_TEMPLATE.result(binding)
end

def get_index(component)
    REACT_INDEX_TS_TEMPLATE.result(binding)
end

def get_option(option)
    REACT_COMPOSITE.result(binding)
end

def get_components(sources)
    components = sources.map do |source|
        parser = CodeGen::MarkdownParser.new

        File.open(source, 'r:bom|utf-8') do |file|
            parser.parse(file.read, CodeGen::React::Component)
        end
    end

    components.sort! {|a, b| a.full_name <=> b.full_name }
end

def react(*args, &block)
    ReactTask.define_task(*args, &block)
end

def write_to_file(path, fileName, content)
    File.open(path + fileName, "w+") do |f|
        f.write content
    end
end

namespace :react do
    %w(master production).each do |branch|
        namespace branch do
            desc "Test react wrappers generation"
            task :test do
                components = get_components(md_api_suite('web'))
                begin
                    components.each do |component|
                        source = get_react(component).strip
                        if source.empty?
                            next
                        end
                        package = get_package(component)
                        index = get_index(component)
                        fileName = source.lines.first.downcase.strip
                        compositeOptions = component.composite_options
                        puts "Processing: " + fileName

                        root = "dist/react/kendo-#{fileName}-react-wrapper/"
                        pathToSource = root  + "src/#{fileName}/"
                        pathToIndex = root + "src/"
                        FileUtils::mkdir_p(pathToSource)

                        write_to_file(root, "package.json", package)
                        write_to_file(pathToSource, "index.tsx", source.lines[2..-1].join)
                        write_to_file(pathToIndex, "index.ts", index)
                        puts "Write Composite Options"
                        compositeOptions.each do |option|
                            write_to_file(pathToSource, option.name + ".ts", get_option(option))
                        end
                    end
                rescue Exception => e
                    puts e.message
                end
                puts "Success!"
            end
        end
    end
end

