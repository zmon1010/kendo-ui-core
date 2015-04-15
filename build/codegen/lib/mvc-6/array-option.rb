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
        FACTORY = ERB.new(File.read("build/codegen/lib/mvc-6/templates/composite-option-builder.erb"), 0, '%<>')
        FACTORY_GENERATED = ERB.new(File.read("build/codegen/lib/mvc-6/templates/array-option-factory-generated.erb"), 0, '%<>')
        FLUENT = ERB.new(File.read("build/codegen/lib/mvc-6/templates/composite-option-fluent.erb"), 0, '%<>')
        SERIALIZATION = ERB.new(File.read("build/codegen/lib/mvc-6/templates/array-option-serialization.erb"), 0, '%<>')

        def item_class
            ArrayItem
        end

        def csharp_class
            "List<#{csharp_item_class_name}>"
        end

        def csharp_item_class
            item_class = "#{owner.csharp_class}#{csharp_name}"

            item_class.chop! if item_class.end_with? "s"

            item_class
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

        def csharp_builder_class
            "#{csharp_item_class}Factory"
        end

        def csharp_builder_class_name
            "#{csharp_item_class}Factory#{csharp_generic_args}"
        end

        def to_declaration
            DECLARATION.result(binding)
        end

        def to_factory
            FACTORY.result(binding)
        end

        def to_factory_generated
            FACTORY_GENERATED.result(binding)
        end

        def to_fluent
            FLUENT.result(binding)
        end

        def to_serialization
            SERIALIZATION.result(binding)
        end
    end

end
