require 'codegen/lib/mvc-6/options'

module CodeGen::MVC6::Wrappers

    FLUENT_EVENT_DECLARATION = ERB.new(
        File.read("build/codegen/lib/mvc-6/templates/event.erb"), 0, '%<>'
    )
    
    TAG_HELPER_EVENT_DECLARATION = ERB.new(
        File.read("build/codegen/lib/mvc-6/templates/tag-helper-event.erb"), 0, '%<>'
    )
    
    TAG_HELPER_EVENT_SERIALIZATION = ERB.new(
        File.read("build/codegen/lib/mvc-6/templates/tag-helper-event-serialization.erb"), 0, '%<>'
    )

    class Event < CodeGen::Event
        include Options

        def event_name
            name
        end

        def to_fluent
            FLUENT_EVENT_DECLARATION.result(binding)
        end

        def tag_helper_event_name
            "On#{name.pascalize}"
        end
        
        def to_tag_helper_event
            TAG_HELPER_EVENT_DECLARATION.result(binding)
        end
        
        def to_tag_helper_event_serialization
            TAG_HELPER_EVENT_SERIALIZATION.result(binding)
        end
    end
end
