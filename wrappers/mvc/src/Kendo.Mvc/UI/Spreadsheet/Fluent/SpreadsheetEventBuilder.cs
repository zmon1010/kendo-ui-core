namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo Spreadsheet for ASP.NET MVC events.
    /// </summary>
    public class SpreadsheetEventBuilder: EventBuilder
    {
        public SpreadsheetEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the render event.</param>
        public SpreadsheetEventBuilder Render(string handler)
        {
            Handler("render", handler);

            return this;
        }
        
        //<< Handlers
    }
}

