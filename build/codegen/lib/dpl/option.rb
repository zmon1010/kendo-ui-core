require 'codegen/lib/dpl/options'

module CodeGen::DPL::Options

    class Option < CodeGen::Option
        include CodeGen::DPL::Options

        DECLARATION = ERB.new(File.read("build/codegen/lib/dpl/templates/option-declaration.erb"), 0, '%<>')

        def struct?
            STRUCT_TYPES.include?(csharp_type) || enum?
        end

        def enum?
            enum_type || values
        end

        def csharp_name
            prefix = (name == 'attributes') ? "Html" : ""

            prefix + name.to_csharp_name
        end

        def to_declaration
            DECLARATION.result(binding)
        end
    end

end
