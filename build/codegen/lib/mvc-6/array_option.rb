require 'codegen/lib/mvc-6/options'

module CodeGen::MVC6::Wrappers::Options

    class ArrayOption < CodeGen::CompositeOption
        include CodeGen::MVC6::Wrappers::Options

        def csharp_class
            "List<#{csharp_item_class}>"
        end

        def csharp_item_class
            item_class = "#{owner.csharp_class}#{csharp_name}"

            item_class.chop! if item_class.end_with? "s"

            item_class
        end

        def csharp_class_name
            "#{csharp_class}#{csharp_generic_args}"
        end

        def csharp_builder_class
            "#{csharp_class}Builder"
        end

        def csharp_builder_class_name
            "#{csharp_class}Builder#{csharp_generic_args}"
        end

        def to_builder_generated
        end

        def to_declaration
        end

        def to_fluent
        end

        def to_settings
        end

        def to_settings_generated
        end

        def to_serialization
        end
    end

end
