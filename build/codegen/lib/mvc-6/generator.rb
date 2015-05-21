module CodeGen::MVC6::Wrappers

    class Generator
        include Rake::DSL

        def initialize(path)
            @path = path
        end

        def component(component)
            component.delete_ignored

            write_component(component)
            write_component_settings(component)
            write_composite_settings(component)
            write_enums(component)
            write_events(component)
            write_builder(component)
            write_builder_settings(component)
        end

        def write_component(component)
            filename = "#{@path}/#{component.path}/#{component.csharp_class}.cs"

            unless File.exists?(filename)
                write_file(filename, component.to_component())
            end
        end

        def write_component_settings(component)
            filename = "#{@path}/#{component.path}/#{component.csharp_class}.Generated.cs"

            write_file(filename, component.to_component_settings())
        end

        def write_composite_settings(component)
            options = component.composite_options

            options.each do |option|
                write_composite(component, option)
            end
        end

        def write_composite(component, option)
            if option.instance_of?(component.array_option_class)
                write_array(component, option)
                return
            end

            # write *Settings.cs file
            filename = "#{@path}/#{component.path}/Settings/#{option.csharp_class}.cs"
            unless File.exists?(filename)
                write_file(filename, option.to_settings)
            end

            # write *Settings.Generated.cs file
            filename = "#{@path}/#{component.path}/Settings/#{option.csharp_class}.Generated.cs"
            write_file(filename, option.to_settings_generated)

            # write *SettingsBuilder.cs file
            filename = "#{@path}/#{component.path}/Fluent/#{option.csharp_builder_class}.cs"
            unless File.exists?(filename)
                write_file(filename, option.to_builder)
            end

            filename = "#{@path}/#{component.path}/Fluent/#{option.csharp_builder_class}.Generated.cs"
            write_file(filename, option.to_builder_generated)

            option.composite_options.each do |o|
                write_composite(component, o)
            end
        end

        def write_array(component, option)
            # Write *Factory.cs file (once)
            filename = "#{@path}/#{component.path}/Fluent/#{option.csharp_builder_class}.cs"
            unless File.exists?(filename)
                write_file(filename, option.to_factory)
            end

            # Write *Factory.Generated.cs file
            filename = "#{@path}/#{component.path}/Fluent/#{option.csharp_builder_class}.Generated.cs"
            write_file(filename, option.to_factory_generated)

            write_composite(component, option.item)
        end

        def write_enums(component)
            options = component.enum_options

            options.each do |option|
                filename = "#{@path}/#{component.path}/#{option.csharp_type}.cs"
                write_file(filename, option.to_enum)
            end
        end

        def write_events(component)
            return if component.events.empty?

            filename = "#{@path}/#{component.path}/Fluent/#{component.csharp_class}EventBuilder.cs"

            write_file(filename, component.to_events())
        end

        def write_builder(component)
            filename = "#{@path}/#{component.path}/Fluent/#{component.csharp_builder_class}.cs"

            unless File.exists?(filename)
                write_file(filename, component.to_builder())
            end
        end

        def write_builder_settings(component)
            filename = "#{@path}/#{component.path}/Fluent/#{component.csharp_builder_class}.Generated.cs"

            write_file(filename, component.to_builder_settings())
        end

        def write_file(filename, content)
            $stderr.puts("Updating #{filename}") if VERBOSE

            ensure_path(filename)

            File.write(filename, content.dos)
        end
    end
end
