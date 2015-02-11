module CodeGen::MVC6::Wrappers::Options

    def unique_options
        composite = composite_options.map { |o| o.name }

        f = options.find_all { |o| o.composite? || !composite.include?(o.name) }
    end

    def csharp_name
        postfix = name[/template$/i].nil? ? "" : "Id"

        name.to_csharp_name + postfix
    end

    def csharp_generic_args
    end

    def to_initialization
        type_args = csharp_generic_args if needs_generics?

        ERB.new(%{
        <%= csharp_name%> = new <%= csharp_class %><%= type_args %>();
            }).result(binding)
    end

    def uses_generic_args?
        GENERIC_BUILDER_SKIP_LIST.inject(true) do |uses_generics, field|
            uses_generics && !full_name.start_with?(field)
        end
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
end
