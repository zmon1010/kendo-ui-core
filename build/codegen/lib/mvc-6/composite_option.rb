require 'codegen/lib/mvc-6/options'

module CodeGen::MVC6::Wrappers::Options

    class CompositeOption < CodeGen::CompositeOption
        include CodeGen::MVC6::Wrappers::Options

        DECLARATION = ERB.new(%{
        public <%= csharp_class %><%=csharp_generic_args%> <%= csharp_name %>
        {
            get;
            set;
        }
        })

        def csharp_class
            prefix = owner.csharp_class.sub('Settings','')
                                        .sub('List<', '')
                                        .sub('>', '')

            "#{prefix}#{csharp_name}Settings"
        end

        def to_declaration
            DECLARATION.result(binding)
        end

        def to_fluent
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
