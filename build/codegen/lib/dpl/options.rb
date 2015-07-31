module CodeGen::DPL::Options

    IGNORED = YAML.load(File.read("build/codegen/lib/dpl/config/ignored.yml")).map(&:downcase)

    SETTINGS = ERB.new(File.read("build/codegen/lib/dpl/templates/component.erb"), 0, '%<>')

    SETTINGS_GENERATED = ERB.new(File.read("build/codegen/lib/dpl/templates/component-settings.erb"), 0, '%<>')

    CSHARP_TYPES = {
        'Number' => 'double',
        'String' => 'string',
        'Boolean' => 'bool',
        'Date' => 'DateTime',
        'Function' => 'ClientHandlerDescriptor'
    }

    STRUCT_TYPES = [
        'int',
        'double',
        'bool',
        'DateTime'
    ]

    def component_class
        Component
    end

    def composite_option_class
        CompositeOption
    end

    def delete_ignored
        return if @options.nil?

        @options.delete_if do |option|
            option.delete_ignored
            IGNORED.include?(option.full_name)
        end
    end

    def option_class
        Option
    end

    def array_option_class
        ArrayOption
    end

    def unique_options
        composite = composite_options.map { |o| o.name }

        f = options.find_all { |o| o.composite? || !composite.include?(o.name) }
    end

    def template?
        name.match(/template$/i)
    end

    def dictionary?
        csharp_type.match(/^IDictionary/)
    end

    def csharp_array?
        csharp_type.match(/\[\]$/)
    end

    def csharp_name
        name.to_csharp_name
    end

    def builtin_names
        # check if child options contain 'name'
        name_field = options.map{ |o| o.options }.flatten.find{ |o| o.name.eql?('name') }

        return [] if name_field.nil?

        name_field.description.scan(/"(\w+)"/i).flatten
    end

    def full_name
        name = @name

        if !@owner.nil?
            name = @owner.full_name + '.' + name
        end

        name.downcase
    end

    def values
        @values if self.respond_to?(:values)
    end

    def component_name
        return @owner.component_name if !@owner.nil?

        csharp_name
    end

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

    def to_settings
        SETTINGS.result(binding)
    end

    def to_settings_generated
        SETTINGS_GENERATED.result(binding)
    end

end
