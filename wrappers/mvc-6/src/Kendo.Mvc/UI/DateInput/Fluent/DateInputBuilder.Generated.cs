using System;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI DateInput
    /// </summary>
    public partial class DateInputBuilder
        
    {
        /// <summary>
        /// Specifies the format, which is used to format the value of the DateInput displayed in the input. The format also will be used to parse the input.
        /// </summary>
        /// <param name="value">The value for Format</param>
        public DateInputBuilder Format(string value)
        {
            Container.Format = value;
            return this;
        }

        /// <summary>
        /// Specifies the maximum date, which the calendar can show.
        /// </summary>
        /// <param name="value">The value for Max</param>
        public DateInputBuilder Max(DateTime value)
        {
            Container.Max = value;
            return this;
        }

        /// <summary>
        /// Specifies the minimum date that the calendar can show.
        /// </summary>
        /// <param name="value">The value for Min</param>
        public DateInputBuilder Min(DateTime value)
        {
            Container.Min = value;
            return this;
        }

        /// <summary>
        /// Specifies the selected date.
        /// </summary>
        /// <param name="value">The value for Value</param>
        public DateInputBuilder Value(DateTime value)
        {
            Container.Value = value;
            return this;
        }


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().DateInput()
        ///       .Name("DateInput")
        ///       .Events(events => events
        ///           .Change("onChange")
        ///       )
        /// )
        /// </code>
        /// </example>
        public DateInputBuilder Events(Action<DateInputEventBuilder> configurator)
        {
            configurator(new DateInputEventBuilder(Container.Events));
            return this;
        }
        
    }
}

