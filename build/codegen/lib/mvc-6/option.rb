require 'codegen/lib/mvc-6/options'

module CodeGen::MVC6::Wrappers::Options

    class Option < CodeGen::Option
        include CodeGen::MVC6::Wrappers::Options

        DECLARATION = ERB.new(File.read("build/codegen/lib/mvc-6/templates/option-declaration.erb"), 0, '%<>')
        FULL_DECLARATION = ERB.new(File.read("build/codegen/lib/mvc-6/templates/option-full-declaration.erb"), 0, '%<>')
        ENUM = ERB.new(File.read("build/codegen/lib/mvc-6/templates/option-enum.erb"), 0, '%<>')
        FLUENT = ERB.new(File.read("build/codegen/lib/mvc-6/templates/option-fluent.erb"), 0, '%<>')
        SERIALIZATION = ERB.new(File.read("build/codegen/lib/mvc-6/templates/option-serialization.erb"), 0, '%<>')
        NAME_MAP = YAML.load(File.read("build/codegen/lib/mvc-6/config/name_map.yml"))

        def struct?
            STRUCT_TYPES.include?(csharp_type) || enum?
        end

        def enum?
            enum_type || values
        end

        def csharp_name
            prefix = (name == 'attributes') ? "Html" : ""

            property_to_override = NAME_MAP != false ? NAME_MAP[full_name] : nil

            return (prefix + property_to_override["name"]) unless property_to_override.nil?

            prefix + name.to_csharp_name
        end

        def full_name
            name = @name

            if !@owner.nil?
                name = @owner.full_name + '.' + name
            end

            name.downcase
        end

        def to_declaration
            DECLARATION.result(binding)
        end

        def to_full_declaration
            FULL_DECLARATION.result(binding)
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
