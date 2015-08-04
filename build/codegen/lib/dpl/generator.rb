module CodeGen

    class DPLGenerator
        include Rake::DSL

        def initialize(path)
            @path = path
        end

        def component(component)
            component.delete_ignored

            write_component(component)
            write_component_settings(component)
            write_composite_settings(component)
        end

        def write_component(component)
            filename = "#{@path}/#{component.csharp_class}.cs"

            unless File.exists?(filename)
                write_file(filename, component.to_settings())
            end
        end

        def write_component_settings(component)
            filename = "#{@path}/#{component.csharp_class}.Generated.cs"

            write_file(filename, component.to_settings_generated())
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
            filename = "#{@path}/#{option.csharp_class}.cs"
            unless File.exists?(filename)
                write_file(filename, option.to_settings)
            end

            # write *Settings.Generated.cs file
            filename = "#{@path}/#{option.csharp_class}.Generated.cs"
            write_file(filename, option.to_settings_generated)

            option.composite_options.each do |o|
                write_composite(component, o)
            end
        end

        def write_array(component, option)
            write_composite(component, option.item)
        end

        def write_file(filename, content)
            $stderr.puts("Updating #{filename}") if VERBOSE

            ensure_path(filename)

            File.write(filename, content.dos)
        end
    end
end
