using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI DateTimePicker
    /// </summary>
    public partial class DateTimePickerBuilder
    {
        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DateTimePicker()
        ///             .Name("DateTimePicker")
        ///             .Events(events => events
        ///                 .Change("onChange")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public DateTimePickerBuilder Events(Action<DateTimePickerEventBuilder> configurator)
        {
            configurator(new DateTimePickerEventBuilder(Component.Events));
            return this;
        }
        
    }
}

