require 'codegen/lib/mvc-6/options'

module CodeGen::MVC6::Wrappers::Options

    class Option < CodeGen::Option
        include CodeGen::MVC6::Wrappers::Options

        DECLARATION = ERB.new(%{
        public <%= struct? ? csharp_type + '?' : csharp_type%> <%= csharp_name %> { get; set; }
                              })

        FLUENT = ERB.new(File.read("build/codegen/lib/mvc-6/option-fluent.erb"), 0, '%<>')

        SERIALIZATION = ERB.new(File.read("build/codegen/lib/mvc-6/option-serialization.erb"), 0, '%<>')

        def struct?
            STRUCT_TYPES.include?(csharp_type) || enum?
        end

        def enum?
            enum_type || values
        end

        def to_declaration
            DECLARATION.result(binding)
        end

        def to_fluent
            FLUENT.result(binding)
        end

        def to_serialization
            SERIALIZATION.result(binding)
        end
    end

end
