module CodeGen::MVC6::Wrappers::EditorGenerator

    EDITOR_TOOLS = YAML.load(File.read("build/codegen/lib/mvc-6/config/editor-tools.yml"))
    EDITOR_TOOL_FACTORY = ERB.new(File.read("build/codegen/lib/mvc-6/templates/editor-tool-factory.erb"), 0, '%<>')
    BUTTON_TOOLS = EDITOR_TOOLS.select { |tool| tool[:overload].eql?("button") }
    COLOR_PICKER_TOOLS = EDITOR_TOOLS.select { |tool| tool[:overload].eql?("colorPicker") }
    DROP_DOWN_TOOLS = EDITOR_TOOLS.select { |tool| tool[:overload].eql?("dropDown") }
    TABLE_EDITING_TOOLS = EDITOR_TOOLS.select { |tool| tool[:overload].eql?("tableEditing") }

    def generate_editor
        write_editor_tool_factory
    end

    def write_editor_tool_factory
        filename = "#{@path}/Editor/Fluent/EditorToolFactory.Generated.cs"

        write_file(filename, EDITOR_TOOL_FACTORY.result(binding))
    end

    def lowercase_first_letter(string)
        new_string = string.dup
        new_string[0] = new_string[0].downcase
        new_string
    end

    def serialize_tool_name(tool)
        if !tool[:serialize_as].nil?
            tool[:serialize_as]
        else
            lowercase_first_letter(tool[:name])
        end
    end
end
