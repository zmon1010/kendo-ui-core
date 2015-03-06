require 'codegen/lib/mvc-6/options'

module CodeGen::MVC6::Wrappers::Options

    class CompositeOption < CodeGen::CompositeOption
        include CodeGen::MVC6::Wrappers::Options

        BUILDER = ERB.new(File.read("build/codegen/lib/mvc-6/composite-option-builder.erb"), 0, '%<>')
        BUILDER_GENERATED = ERB.new(File.read("build/codegen/lib/mvc-6/composite-option-builder-generated.erb"), 0, '%<>')

        DECLARATION = ERB.new(%{
        public <%= csharp_class_name %> <%= csharp_name %> { get; } = new <%= csharp_class_name %>();
})

        FLUENT = ERB.new(File.read("build/codegen/lib/mvc-6/composite-option-fluent.erb"), 0, '%<>')

        SETTINGS = ERB.new(File.read("build/codegen/lib/mvc-6/composite-option.erb"), 0, '%<>')
        SETTINGS_GENERATED = ERB.new(File.read("build/codegen/lib/mvc-6/composite-option-settings.erb"), 0, '%<>')

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
            BUILDER.result(binding)
        end

        def to_builder_generated
            BUILDER_GENERATED.result(binding)
        end

        def to_settings
            SETTINGS.result(binding)
        end

        def to_settings_generated
            SETTINGS_GENERATED.result(binding)
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
