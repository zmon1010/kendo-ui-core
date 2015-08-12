require "erb"

module CodeGen

    ITEM_GROUP = ERB.new(%{<ItemGroup Label="GeneratedModels">
    % @@files.each { |filename|
        <Compile Include="<%=filename%>" Exclude="@(Compile)" />
    % }
  </ItemGroup>})

    class DPLGenerator
        include Rake::DSL

        @@files = []

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

            @@files.push(filename)

            unless File.exists?(filename)
                write_file(filename, component.to_settings())
            end
        end

        def write_component_settings(component)
            filename = "#{@path}/#{component.csharp_class}.Generated.cs"

            @@files.push(filename)

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

            @@files.push(filename)

            unless File.exists?(filename)
                write_file(filename, option.to_settings)
            end

            # write *Settings.Generated.cs file
            filename = "#{@path}/#{option.csharp_class}.Generated.cs"

            @@files.push(filename)

            write_file(filename, option.to_settings_generated)

            option.composite_options.each do |o|
                write_composite(component, o)
            end
        end

        def write_array(component, option)
            write_composite(component, option.item) unless option.item.primitive
        end

        def write_file(filename, content)
            $stderr.puts("Updating #{filename}") if VERBOSE

            ensure_path(filename)

            File.write(filename, content.dos)
        end

        def self.register_files(filename)
            return unless File.exists?(filename)

            content = File.read(filename)

            compile = ''

            @@files.each do |filename|
                filename = filename.split('/').last

                item = "<Compile Include=\"Models\\#{filename}\" />\n"

                p item

                compile << item unless content =~ %r{#{Regexp.escape(item)}}
            end

            return if compile.empty?

            content = content.sub(/<ItemGroup Label="GeneratedModels">(.|\n)*<\/ItemGroup>/, "<ItemGroup Label=\"GeneratedModels\">\n#{compile}</ItemGroup>")

            File.write(filename, content.dos)
        end
    end
end
