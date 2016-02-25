class ModelMember
    include CodeGen::MVC6::Wrappers::Options

    attr_reader :type, :name, :enum_type

    def initialize(config)
        @type = config[:type]
        @name = config[:name]
        @enum_type = config[:enum_type]
    end
end

class ModelContext
    attr_reader :type, :members

    def initialize(model)
        @type = model[:type]
        @members =  model[:members].map {|member| ModelMember.new(member)}
    end

    def get_binding
        binding
    end
end

module CodeGen::MVC6::Wrappers::ModelGenerator
    INTERFACE_TEMPLATE = ERB.new(File.read("build/codegen/lib/mvc-6/templates/model-interface.erb"), 0, '%<>')
    DESCRIPTOR_TEMPLATE = ERB.new(File.read("build/codegen/lib/mvc-6/templates/model-descriptor.erb"), 0, '%<>')
    DESCRIPTOR_FACTORY_TEMPLATE = ERB.new(File.read("build/codegen/lib/mvc-6/templates/model-descriptor-factory.erb"), 0, '%<>')
    ENUM_TEMPLATE = ERB.new(File.read("build/codegen/lib/mvc-6/templates/option-enum.erb"), 0, '%<>')

    def write_models(component)
        @componentPath = component.path
        models = YAML.load(File.read("build/codegen/lib/mvc-6/models/#{component.name.downcase}.yml"))

        write_modelEnums(models)
        write_interfaces(models)
        write_modelDescriptors(models)
        write_modelDescriptorFactories(models)
    end

    def write_modelEnums(models)
        models.each do |model|
            model[:members].each do |member|
                if !member[:values].nil?
                    ctx = EnumContext.new(member)
                    filename = "#{@path}/#{@componentPath}/#{member[:enum_type]}.Generated.cs"     
                    write_file(filename, ENUM_TEMPLATE.result(ctx.get_binding))
                end
            end
        end
    end

    def write_interfaces(models)
        models.each do |model|
            filename = "#{@path}/#{@componentPath}/I#{model[:type]}.Generated.cs"
            ctx = ModelContext.new(model)
            write_file(filename, INTERFACE_TEMPLATE.result(ctx.get_binding))
        end
    end

    def write_modelDescriptors(models)
        models.each do |model|
            filename = "#{@path}/#{@componentPath}/#{model[:type]}ModelDescriptor.Generated.cs"
            ctx = ModelContext.new(model)
            write_file(filename, DESCRIPTOR_TEMPLATE.result(ctx.get_binding))
        end
    end

    def write_modelDescriptorFactories(models)
        models.each do |model|
            filename = "#{@path}/#{@componentPath}/Fluent/#{model[:type]}ModelDescriptorFactory.Generated.cs"
            ctx = ModelContext.new(model)
            write_file(filename, DESCRIPTOR_FACTORY_TEMPLATE.result(ctx.get_binding))
        end
    end
end
