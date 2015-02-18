module CodeGen::MVC6::Wrappers

    class Generator
        include Rake::DSL

        def initialize(path)
            @path = path
        end

        def component(component)
            write_component(component)
            write_component_settings(component)
            write_events(component)
            write_builder(component)
            write_builder_settings(component)
        end

        def write_component(component)
            filename = "#{@path}/#{component.path}/#{component.csharp_class}.cs"

            unless File.exists?(filename)
                write_file(filename, component.to_component(filename))
            end
        end

        def write_component_settings(component)
            filename = "#{@path}/#{component.path}/#{component.csharp_class}.Settings.cs"

            write_file(filename, component.to_component_settings(filename))
        end

        def write_events(component)
            return if component.events.empty?

            filename = "#{@path}/#{component.path}/Fluent/#{component.csharp_class}EventBuilder.cs"

            write_file(filename, component.to_events(filename))
        end

        def write_builder(component)
            filename = "#{@path}/#{component.path}/Fluent/#{component.csharp_builder_class}.cs"

            unless File.exists?(filename)
                write_file(filename, component.to_builder(filename))
            end
        end

        def write_builder_settings(component)
            filename = "#{@path}/#{component.path}/Fluent/#{component.csharp_builder_class}.Settings.cs"

            write_file(filename, component.to_builder_settings(filename))
        end

        def write_file(filename, content)
            $stderr.puts("Updating #{filename}") if VERBOSE

            ensure_path(filename)

            File.write(filename, content.dos)
        end
    end
end
