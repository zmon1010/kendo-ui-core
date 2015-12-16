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
        /// Triggered after the widget has completed rendering.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the render event.</param>
        public SpreadsheetEventBuilder Render(string handler)
        {
            Handler("render", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user clicks the "Export to Excel" toolbar button.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the excelExport event.</param>
        public SpreadsheetEventBuilder ExcelExport(string handler)
        {
            Handler("excelExport", handler);

            return this;
        }
        
        /// <summary>
        /// Fired when the user clicks the "Open" toolbar button.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the excelImport event.</param>
        public SpreadsheetEventBuilder ExcelImport(string handler)
        {
            Handler("excelImport", handler);

            return this;
        }
        
        //<< Handlers
    }
}

