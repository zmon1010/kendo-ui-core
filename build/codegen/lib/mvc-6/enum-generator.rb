class EnumContext
    attr_reader :csharp_type, :description, :values

    def initialize(enum)
        @csharp_type = enum[:type]
        @description = enum[:description]
        @values = enum[:values]
    end

    def get_binding
        binding
    end
end

module CodeGen::MVC6::Wrappers::EnumGenerator
    ENUMS = YAML.load(File.read("build/codegen/lib/mvc-6/config/enums.yml"))
    ENUM_TEMPLATE = ERB.new(File.read("build/codegen/lib/mvc-6/templates/option-enum.erb"), 0, '%<>')

    def generate_enums()
        ENUMS.each do |enum|
            filename = "#{@path}/Enums/#{enum[:type]}.cs"
            ctx = EnumContext.new(enum)
            write_file(filename, ENUM_TEMPLATE.result(ctx.get_binding))
        end
    end
end
