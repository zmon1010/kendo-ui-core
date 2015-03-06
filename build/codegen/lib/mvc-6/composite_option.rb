require 'codegen/lib/mvc-6/options'

module CodeGen::MVC6::Wrappers::Options

    class CompositeOption < CodeGen::CompositeOption
        include CodeGen::MVC6::Wrappers::Options

        DECLARATION = ERB.new(%{
        public <%= csharp_class_name %> <%= csharp_name %> { get; } = new <%= csharp_class_name %>();
        })

        FLUENT = ERB.new(File.read("build/codegen/lib/mvc-6/composite-option-fluent.erb"), 0, '%<>')

        def csharp_class
            prefix = owner.csharp_class.sub('Settings','')
                                        .sub('List<', '')
                                        .sub('>', '')

            "#{prefix}#{csharp_name}Settings"
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

        def to_declaration
            DECLARATION.result(binding)
        end

        def to_fluent
            FLUENT.result(binding)
        end

        def to_builder
        end

        def to_serialization
            ERB.new(%{
            var <%= name %> = <%= csharp_name %>.Serialize();
            if (<%= name %>.Any())
            {
                settings["<%= name %>"] = <%= name %>;
            }
            }).result(binding)
        end
    end

end
