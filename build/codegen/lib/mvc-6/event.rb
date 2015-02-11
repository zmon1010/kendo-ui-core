require 'codegen/lib/mvc-6/options'

module CodeGen::MVC6::Wrappers

    FLUENT_EVENT_DECLARATION = ERB.new(%{
    /// <summary>
    /// <%= description.gsub(/\r?\n/, '\n\t\t/// ').html_encode()%>
    /// </summary>
    /// <param name="handler">The name of the JavaScript function that will handle the <%= name %> event.</param>
    public <%= owner.csharp_class %>EventBuilder <%= csharp_name %>(string handler)
    {
        Handler("<%= event_name %>", handler);

        return this;
    }
    })

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
