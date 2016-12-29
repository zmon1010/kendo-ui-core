require 'codegen/lib/mvc-6/options'
require 'codegen/lib/mvc-6/composite-option'

module CodeGen::MVC6::Wrappers::Options

    class ArrayItem < CompositeOption
        def csharp_class
            owner.csharp_item_class
        end

        def csharp_builder_class
            owner.csharp_item_builder_class
        end

        def full_name
            @owner.full_name
        end
    end

    class ArrayOption < CompositeOption
        include CodeGen::Array

        DECLARATION = ERB.new(File.read("build/codegen/lib/mvc-6/templates/array-option-declaration.erb"), 0, '%<>')
        REFERENCE = ERB.new(File.read("build/codegen/lib/mvc-6/templates/tag-helper-array-option-reference.erb"), 0, '%<>')
        FULL_DECLARATION = ERB.new(File.read("build/codegen/lib/mvc-6/templates/tag-helper-array-option-declaration.erb"), 0, '%<>')
        FACTORY = ERB.new(File.read("build/codegen/lib/mvc-6/templates/composite-option-builder.erb"), 0, '%<>')
        FACTORY_GENERATED = ERB.new(File.read("build/codegen/lib/mvc-6/templates/array-option-factory-generated.erb"), 0, '%<>')
        FLUENT = ERB.new(File.read("build/codegen/lib/mvc-6/templates/composite-option-fluent.erb"), 0, '%<>')
        SERIALIZATION = ERB.new(File.read("build/codegen/lib/mvc-6/templates/array-option-serialization.erb"), 0, '%<>')
        TAG_HELPER_SERIALIZATION = ERB.new(File.read("build/codegen/lib/mvc-6/templates/tag-helper-array-option-serialization.erb"), 0, '%<>')

        def item_class
            ArrayItem
        end

        def array?
            true
        end

        def csharp_class
            "List<#{csharp_item_class_name}>"
        end

        def csharp_item_class
            item_class = "#{owner.csharp_class}#{csharp_name}"

            case item_class
                when /Axis$/    then item_class
                when /Series$/  then item_class
                when /s$/       then item_class.chop
                else                 item_class
            end
        end

        def csharp_item_class_name
            "#{csharp_item_class}#{csharp_generic_args}"
        end

        def csharp_item_builder_class
            "#{csharp_item_class}Builder"
        end

        def csharp_item_builder_class_name
            "#{csharp_item_class}Builder#{csharp_generic_args}"
        end

        def csharp_class_name
            "#{csharp_class}"
        end

        def csharp_collection_class_name
            csharp_item_class.pluralize
        end

        def csharp_builder_class
            "#{csharp_item_class}Factory"
        end

        def csharp_builder_class_name
            "#{csharp_item_class}Factory#{csharp_generic_args}"
        end

        def taghelper_collection_class_name
            csharp_item_class_name + TagHelper
        end

        def taghelper_class
            "#{csharp_item_class}TagHelper#{csharp_generic_args}"
        end

        def to_declaration
            DECLARATION.result(binding)
        end

        def to_full_declaration
            FULL_DECLARATION.result(binding)
        end

        def to_reference
            REFERENCE.result(binding)
        end

        def to_factory
            FACTORY.result(binding)
        end

        def to_factory_generated
            FACTORY_GENERATED.result(binding)
        end

        def to_fluent
            FLUENT.result(binding) if fluent?
        end

        def to_serialization
            SERIALIZATION.result(binding)
        end

        def to_tag_helper_serialization
            TAG_HELPER_SERIALIZATION.result(binding)
        end
    end

end
