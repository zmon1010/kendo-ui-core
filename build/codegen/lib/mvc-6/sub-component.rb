module CodeGen::MVC6
end

module CodeGen::MVC6::Wrappers
end

require 'codegen/lib/mvc-6/component'

module CodeGen::MVC6::Wrappers

    class SubComponent < Component
        include Options

        attr_reader :taghelper_collection_parent_element,
                    :taghelper_class,
                    :taghelper_parent_class,
                    :taghelper_collection_parent_class,
                    :csharp_generic_args,
                    :collection_component,
                    :parent

        def initialize(settings)
            super(settings)
            @path = settings[:path]
            @parent = settings[:taghelper_parent].kebab
            @taghelper_collection_parent_element = settings[:taghelper_parent].kebab
            @taghelper_element = settings[:taghelper_element].kebab
            @taghelper_class = settings[:taghelper_class]
            @taghelper_parent_class = parent_class(settings)
            @taghelper_collection_parent_class = settings[:taghelper_parent_class]
            @csharp_generic_args = settings[:csharp_generic_args]
            @collection_component = settings[:collection_component]
            @collection_reference = settings[:collection_reference]
            @options.concat(settings[:options])
        end

        TAG_HELPER = ERB.new(File.read("build/codegen/lib/mvc-6/templates/tag-helper-sub.erb"), 0, '%<>')
        TAG_HELPER_COLLECTION = ERB.new(File.read("build/codegen/lib/mvc-6/templates/tag-helper-collection.erb"), 0, '%<>')
        TAG_HELPER_SETTINGS = ERB.new(File.read("build/codegen/lib/mvc-6/templates/tag-helper-settings.erb"), 0, '%<>')
        TAG_HELPER_EVENTS = ERB.new(File.read("build/codegen/lib/mvc-6/templates/tag-helper-event-builder.erb"), 0, '%<>')

        def parent_class(settings)
            if settings[:collection_component]
                then
                    settings[:collection_reference].taghelper_collection_class_name
                else
                    settings[:taghelper_parent_class]
            end
        end

        def path
            @path
        end

        def collection_reference
            @collection_reference
        end

        def composite_component?
            true
        end

        def collection_component?
            @collection_component
        end

        def taghelper_parent_element
            if collection_component? then taghelper_collection_element else parent end
        end

        def taghelper_collection_element
            "kendo-#{@taghelper_element.pluralize}"
        end

        def taghelper_element
            "kendo-#{@taghelper_element}"
        end

        def taghelper_structure
            if collection_component? || children.size > 0
                "TagStructure.NormalOrSelfClosing"
            else
                "TagStructure.WithoutEndTag"
            end
        end

        def to_tag_helper
            TAG_HELPER.result(binding)
        end

        def to_tag_helper_collection
            TAG_HELPER_COLLECTION.result(binding)
        end

        def to_tag_helper_collection_reference
            collection_reference.to_reference
        end

        def to_tag_helper_settings
            TAG_HELPER_SETTINGS.result(binding)
        end

        def to_tag_helper_events
            TAG_HELPER_EVENTS.result(binding)
        end
    end
end
