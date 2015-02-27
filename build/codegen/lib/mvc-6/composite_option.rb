require 'codegen/lib/mvc-6/options'

module CodeGen::MVC6::Wrappers::Options

    class CompositeOption < CodeGen::CompositeOption
        include CodeGen::MVC6::Wrappers::Options

        def to_declaration
        end

        def to_fluent
        end
    end

end
