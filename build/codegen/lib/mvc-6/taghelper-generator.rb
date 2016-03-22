module CodeGen::MVC6::Wrappers

    IGNORED_TAG_HELPER = YAML.load(File.read("build/codegen/lib/mvc-6/config_taghelpers/ignored.yml")).map(&:downcase)

    class TagHelperGenerator
        include Rake::DSL
        
        def initialize(path)
            @path = path
        end

        def tag_helper(component)
            component.delete_ignored(IGNORED_TAG_HELPER)

            write_tag_helper(component)
            write_tag_helper_settings(component)
            write_tag_helper_events(component)
        end

        def write_tag_helper(component)
            filename = "#{@path}/#{component.path}/#{component.taghelper_class}.cs"

            unless File.exists?(filename)
                write_file(filename, component.to_tag_helper())
            end
        end

        def write_tag_helper_settings(component)
            filename = "#{@path}/#{component.path}/#{component.taghelper_class}.Generated.cs"

            write_file(filename, component.to_tag_helper_settings())
        end

        def write_tag_helper_events(component)
            return if component.events.empty?

            filename = "#{@path}/#{component.path}/#{component.taghelper_class}.Events.cs"

            write_file(filename, component.to_tag_helper_events())
        end

        def write_file(filename, content)
            $stderr.puts("Updating #{filename}") if VERBOSE

            ensure_path(filename)

            File.write(filename, content.dos)
        end
    end
end
