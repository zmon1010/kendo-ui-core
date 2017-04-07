module CodeGen::MVC6::Wrappers::ListBoxGenerator

    LISTBOX_TOOLS = YAML.load(File.read("build/codegen/lib/mvc-6/config/listbox-tools.yml"))
    LISTBOX_TOOL_FACTORY = ERB.new(File.read("build/codegen/lib/mvc-6/templates/listbox-tool-factory.erb"), 0, '%<>')

     def generate_listbox
         write_listbox_tool_factory
     end

     def write_listbox_tool_factory
         filename = "#{@path}/ListBox/Fluent/ListBoxToolFactory.Generated.cs"

         write_file(filename, LISTBOX_TOOL_FACTORY.result(binding))
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
