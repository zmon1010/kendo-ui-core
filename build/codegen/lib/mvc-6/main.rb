# Define namespace symbols
module CodeGen::MVC6
end

module CodeGen::MVC6::Wrappers
    IGNORED = YAML.load(File.read("build/codegen/lib/mvc-6/config/ignored.yml")).map do |option|
        if option.instance_of?(String)
            option.downcase
        else
            option
        end
    end
end

require 'codegen/lib/mvc-6/component'
require 'codegen/lib/mvc-6/chart-generator'
require 'codegen/lib/mvc-6/editor-generator'
require 'codegen/lib/mvc-6/enum-generator'
require 'codegen/lib/mvc-6/model-generator'
require 'codegen/lib/mvc-6/generator'
require 'codegen/lib/mvc-6/taghelper-generator'
