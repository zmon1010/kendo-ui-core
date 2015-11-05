require 'codegen/lib/dpl/options'
require 'codegen/lib/dpl/composite-option'

module CodeGen::DPL::Options

    class ArrayItem < CompositeOption
        def csharp_class
            owner.csharp_item_class
        end

        def full_name
            @owner.full_name
        end
    end

    class ArrayOption < CompositeOption
        include CodeGen::Array

        DECLARATION = ERB.new(File.read("build/codegen/lib/dpl/templates/array-option-declaration.erb"), 0, '%<>')

        SERIALIZATION = ERB.new(File.read("build/codegen/lib/dpl/templates/array-option-serialization.erb"), 0, '%<>')

        def item_class
            ArrayItem
        end

        def csharp_class
            result_class = "List<#{csharp_item_class_name}>"

            if item.primitive
                result_class = "List<#{item.item_type}>"
            end

            result_class
        end

        def csharp_item_class
            item_class = "#{csharp_name}"

            case item_class
                when /s$/       then item_class.chop
                else                 item_class
            end
        end

        def csharp_item_class_name
            "#{csharp_item_class}"
        end

        def csharp_class_name
            "#{csharp_class}"
        end

        def to_declaration
            DECLARATION.result(binding)
        end

        def to_serialization
            SERIALIZATION.result(binding)
        end
    end

end
