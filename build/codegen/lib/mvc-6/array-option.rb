require 'codegen/lib/mvc-6/options'

module CodeGen::MVC6::Wrappers::Options

    class ArrayOption < CodeGen::CompositeOption
        include CodeGen::MVC6::Wrappers::Options

        DECLARATION = ERB.new(File.read("build/codegen/lib/mvc-6/array-option-declaration.erb"), 0, '%<>')
        SERIALIZATION = ERB.new(File.read("build/codegen/lib/mvc-6/composite-option-serialization.erb"), 0, '%<>')

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
            DECLARATION.result(binding)
        end

        def to_fluent
        end

        def to_settings
        end

        def to_settings_generated
        end

        def to_serialization
            SERIALIZATION.result(binding)
        end
    end

end
