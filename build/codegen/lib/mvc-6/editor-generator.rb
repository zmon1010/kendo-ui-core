module CodeGen::MVC6::Wrappers::EditorGenerator

    EDITOR_TOOLS = YAML.load(File.read("build/codegen/lib/mvc-6/config/editor-tools.yml"))
    EDITOR_TOOL_FACTORY = ERB.new(File.read("build/codegen/lib/mvc-6/templates/editor-tool-factory.erb"), 0, '%<>')
    BUTTON_TOOLS = EDITOR_TOOLS.select { |tool| !!tool[:button] }
    DROP_DOWN_TOOLS = EDITOR_TOOLS.select { |tool| !!tool[:dropDown] }
    TABLE_EDITING_TOOLS = EDITOR_TOOLS.select { |tool| !!tool[:table_editing] }

    def generate_editor
        write_editor_tool_factory
    end

    def write_editor_tool_factory
        filename = "#{@path}/Editor/Fluent/EditorToolFactory.Generated.cs"

        write_file(filename, EDITOR_TOOL_FACTORY.result(binding))
    end

    def capitalize_first_letter(string)
        capitalized_string = string.dup
        capitalized_string[0] = capitalized_string[0].upcase
        capitalized_string
    end
end
