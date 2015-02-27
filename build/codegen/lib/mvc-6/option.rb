require 'codegen/lib/mvc-6/options'

module CodeGen::MVC6::Wrappers::Options

    DECLARATION = ERB.new(%{
        public <%= struct? ? csharp_type + '?' : csharp_type%> <%= csharp_name %> { get; set; }
    })

    FLUENT = ERB.new(File.read("build/codegen/lib/mvc-6/option-fluent.erb"), 0, '%<>')

    CSHARP_TYPES = {
        'Number' => 'double',
        'String' => 'string',
        'Boolean' => 'bool',
        'Date' => 'DateTime'
    }

    STRUCT_TYPES = [
        'int',
        'double',
        'bool',
        'DateTime'
    ]

    class Option < CodeGen::Option
        include CodeGen::MVC6::Wrappers::Options

        def csharp_type
            return_type = ''

            if enum_type
                # Manually specified enum type in YML
                return_type = enum_type
            elsif values
                # Enumerable with values specified in widget YML
                return_type = "#{owner.csharp_class.gsub(/Settings/, "")}#{csharp_name}"
            elsif full_name.match(/attributes$/)
                return_type = 'IDictionary<string,object>'
            elsif type.is_a? String
                # Manually overriden type in YML
                return_type = type
            else
                # Map to C# type
                return_type = CSHARP_TYPES[type[0]]
            end

            if return_type.nil? || return_type.empty?
                raise "Unknown type mapping for #{full_name}, source type is #{type}"
            end

            return_type
        end

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
    end

end
