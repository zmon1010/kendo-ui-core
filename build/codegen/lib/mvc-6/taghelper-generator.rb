require 'codegen/lib/mvc-6/sub-component'

module CodeGen::MVC6::Wrappers
    IGNORED_TAG_HELPER = YAML.load(File.read("build/codegen/lib/mvc-6/config_taghelpers/ignored.yml")).map(&:downcase)

    class TagHelperGenerator
        include Rake::DSL

        def initialize(path)
            @path = path
        end

        def tag_helper(component)
            component.delete_ignored(IGNORED_TAG_HELPER)
            component.initialize_children()

            write_tag_helper(component)
            write_tag_helper_settings(component)
            write_tag_helper_events(component)
            write_tag_helper_children(component)
        end

        def write_tag_helper(component)
            filename = "#{@path}/#{component.path}/#{component.taghelper_class}.cs"

            unless File.exists?(filename)
                write_file(filename, component.to_tag_helper())
            end

            if component.collection_component? then
                write_file("#{@path}/#{component.path}/#{component.taghelper_class}Collection.cs", component.to_tag_helper_collection())
            end
        end

        def write_tag_helper_children(component)
            component.unique_options.each do |option|
                if option.array? then
                    temp_component_options = self.array_item_options(component, option)
                    temp_component = SubComponent.new(temp_component_options)
                    self.tag_helper(temp_component)
                elsif option.composite?
                    temp_component_options = self.composite_item_options(component, option)
                    temp_component = SubComponent.new(temp_component_options)
                    temp_component.initialize_children()
                    self.tag_helper(temp_component)
                end
            end
        end

        def array_item_options(component, option)
            {
                name: option.csharp_item_class,
                taghelper_parent_class: component.taghelper_class,
                taghelper_parent: component.taghelper_element,
                taghelper_element: option.csharp_item_class,
                taghelper_class: option.taghelper_class,
                csharp_generic_args: option.csharp_generic_args,
                path: component.path,
                options: option.item.options,
                collection_reference: option,
                collection_component: true
            }
        end

        def composite_item_options(component, option)
            {
                name: option.name,
                taghelper_parent_class: component.taghelper_class,
                taghelper_parent: component.taghelper_element,
                taghelper_element: option.csharp_class,
                taghelper_class: option.taghelper_class,
                csharp_generic_args: option.csharp_generic_args,
                path: component.path,
                options: option.options,
                collection_component: false
            }
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
            filename = filename.gsub(/(\<\w+\>)/, '')

            $stderr.puts("Updating #{filename}") if VERBOSE

            ensure_path(filename)

            File.write(filename, content.dos)
        end
    end
end
