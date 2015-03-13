require 'codegen/lib/mvc-6/options'

module CodeGen::MVC6::Wrappers

    FLUENT_EVENT_DECLARATION = ERB.new(
        File.read("build/codegen/lib/mvc-6/templates/event.erb"), 0, '%<>'
    )

    class Event < CodeGen::Event
        include Options

        def event_name
            name
        end

        def to_fluent
            FLUENT_EVENT_DECLARATION.result(binding)
        end
    end
end
