module CodeGen::MVC6
end

module CodeGen::MVC6::Wrappers
end

require 'codegen/lib/mvc-6/options'
require 'codegen/lib/mvc-6/option'
require 'codegen/lib/mvc-6/array-option'
require 'codegen/lib/mvc-6/composite-option'
require 'codegen/lib/mvc-6/event'

module CodeGen::MVC6::Wrappers

    class Component < CodeGen::Component
        include Options

        COMPONENT = ERB.new(File.read("build/codegen/lib/mvc-6/templates/component.erb"), 0, '%<>')
        COMPONENT_SETTINGS = ERB.new(File.read("build/codegen/lib/mvc-6/templates/component-settings.erb"), 0, '%<>')
        EVENT = ERB.new(File.read("build/codegen/lib/mvc-6/templates/event-builder.erb"), 0, '%<>')
        BUILDER = ERB.new(File.read("build/codegen/lib/mvc-6/templates/component-builder.erb"), 0, '%<>')
        BUILDER_SETTINGS = ERB.new(File.read("build/codegen/lib/mvc-6/templates/component-builder-settings.erb"), 0, '%<>')
        TAG_HELPER = ERB.new(File.read("build/codegen/lib/mvc-6/templates/tag-helper.erb"), 0, '%<>')
        TAG_HELPER_SETTINGS = ERB.new(File.read("build/codegen/lib/mvc-6/templates/tag-helper-settings.erb"), 0, '%<>')
        TAG_HELPER_EVENTS = ERB.new(File.read("build/codegen/lib/mvc-6/templates/tag-helper-event-builder.erb"), 0, '%<>')

        def path
            name
        end

        def csharp_class
            name
        end

        def taghelper_element
            "kendo-#{csharp_class.downcase}"
        end

        def taghelper_class
            "#{csharp_class}TagHelper"
        end

        def csharp_builder_class
            "#{csharp_class}Builder"
        end

        def event_class
            Event
        end

        def to_component()
            COMPONENT.result(binding)
        end

        def to_component_settings()
            COMPONENT_SETTINGS.result(binding)
        end

        def to_events()
            EVENT.result(binding)
        end

        def to_builder()
            BUILDER.result(binding)
        end

        def to_builder_settings()
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

        def to_tag_helper
            TAG_HELPER.result(binding)
        end
        
        def to_tag_helper_settings
            TAG_HELPER_SETTINGS.result(binding)
        end

        def to_tag_helper_events
            TAG_HELPER_EVENTS.result(binding)
        end
    end

end
