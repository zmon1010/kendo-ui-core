require 'codegen/lib/mvc-6/options'

module CodeGen::MVC6::Wrappers::Options

    class Option < CodeGen::Option
        include CodeGen::MVC6::Wrappers::Options

        DECLARATION = ERB.new(File.read("build/codegen/lib/mvc-6/templates/option-declaration.erb"), 0, '%<>')
        ENUM = ERB.new(File.read("build/codegen/lib/mvc-6/templates/option-enum.erb"), 0, '%<>')
        FLUENT = ERB.new(File.read("build/codegen/lib/mvc-6/templates/option-fluent.erb"), 0, '%<>')
        SERIALIZATION = ERB.new(File.read("build/codegen/lib/mvc-6/templates/option-serialization.erb"), 0, '%<>')

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

        def to_fluent
            FLUENT.result(binding) if fluent?
        end

        def to_serialization
            SERIALIZATION.result(binding)
        end

        def to_enum
            ENUM.result(binding)
        end
    end

end
