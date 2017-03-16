namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo DateInput for ASP.NET MVC events.
    /// </summary>
    public class DateInputEventBuilder: EventBuilder
    {
        public DateInputEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fires when the selected date is changed
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the change event.</param>
        public DateInputEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }
        
        //<< Handlers
    }
}

