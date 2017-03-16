namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo DateInput for ASP.NET MVC.
    /// </summary>
    public class DateInputBuilder: WidgetBuilderBase<DateInput, DateInputBuilder>
    {
        private readonly DateInput container;
        /// <summary>
        /// Initializes a new instance of the <see cref="DateInput"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public DateInputBuilder(DateInput component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the format, which is used to format the value of the DateInput displayed in the input. The format also will be used to parse the input.
        /// </summary>
        /// <param name="value">The value that configures the format.</param>
        public DateInputBuilder Format(string value)
        {
            container.Format = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the maximum date, which the calendar can show.
        /// </summary>
        /// <param name="value">The value that configures the max.</param>
        public DateInputBuilder Max(DateTime value)
        {
            container.Max = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the minimum date that the calendar can show.
        /// </summary>
        /// <param name="value">The value that configures the min.</param>
        public DateInputBuilder Min(DateTime value)
        {
            container.Min = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the selected date.
        /// </summary>
        /// <param name="value">The value that configures the value.</param>
        public DateInputBuilder Value(DateTime value)
        {
            container.Value = value;

            return this;
        }
        
        //<< Fields


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DateInput()
        ///             .Name("DateInput")
        ///             .Events(events => events
        ///                 .Change("onChange")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public DateInputBuilder Events(Action<DateInputEventBuilder> configurator)
        {

            configurator(new DateInputEventBuilder(Component.Events));

            return this;
        }
        
    }
}

