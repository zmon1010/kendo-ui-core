require 'codegen/lib/mvc-6/options'
require 'codegen/lib/mvc-6/event'

module CodeGen::MVC6::Wrappers

    COMPONENT = ERB.new(File.read("build/codegen/lib/mvc-6/component.erb"), 0, '%<>')
    EVENT = ERB.new(File.read("build/codegen/lib/mvc-6/event-builder.erb"), 0, '%<>')
    BUILDER = ERB.new(File.read("build/codegen/lib/mvc-6/component-builder.erb"), 0, '%<>')
    BUILDER_SETTINGS = ERB.new(File.read("build/codegen/lib/mvc-6/component-builder-settings.erb"), 0, '%<>')

    GENERIC_ARGS = YAML.load(File.read("build/codegen/lib/mvc-6/generics.yml"))

    class Component < CodeGen::Component
        include Options

        def path
            name
        end

        def csharp_class
            name
        end

        def csharp_builder_class
            "#{csharp_class}Builder"
        end

        def event_class
            Event
        end

        def to_component(filename)
            COMPONENT.result(binding)
        end

        def to_events(filename)
            EVENT.result(binding)
        end

        def to_builder(filename)
            BUILDER.result(binding)
        end

        def to_builder_settings(filename)
            BUILDER_SETTINGS.result(binding)
        end

        def enum_options
            enums = simple_options.select{ |o| !o.values.nil? }
            composite = composite_options.flat_map { |o| o.options }

            composite.each do |item|
                composite.push(*item.options) if item.composite?

                enums.push(item) if !item.values.nil?
            end

            enums
        end
    end

end
