using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI DateTimePicker
    /// </summary>
    public partial class DateTimePickerBuilder
        
    {
        /// <summary>
        /// Configures the opening and closing animations of the popups. Setting the animation option to false will disable the opening and closing animations. As a result the popup will open and close instantly.
        /// </summary>
        /// <param name="configurator">The configurator for the animation setting.</param>
        public DateTimePickerBuilder Animation(Action<DateTimePickerAnimationSettingsBuilder> configurator)
        {
            configurator(new DateTimePickerAnimationSettingsBuilder(Container.Animation));
            return this;
        }
        /// <summary>
        /// Specifies a template used to populate value of the aria-label attribute.
        /// </summary>
        /// <param name="value">The value that configures the ariatemplateid.</param>
        public DateTimePickerBuilder ARIATemplateId(string value)
        {
            Container.ARIATemplateId = value;

            return this;
        }
        /// <summary>
        /// Specifies the culture info used by the widget.
        /// </summary>
        /// <param name="value">The value that configures the culture.</param>
        public DateTimePickerBuilder Culture(string value)
        {
            Container.Culture = value;

            return this;
        }
        /// <summary>
        /// Specifies a list of dates, which will be passed to the month template of the DateView. All dates, which match the date portion of the selected date will be used to re-bind the TimeView.
        /// </summary>
        /// <param name="value">The value that configures the dates.</param>
        public DateTimePickerBuilder Dates(params DateTime[] value)
        {
            Container.Dates = value;

            return this;
        }
        /// <summary>
        /// Specifies the navigation depth of the calendar. The following
		/// settings are available for the depth value:
        /// </summary>
        /// <param name="value">The value that configures the depth.</param>
        public DateTimePickerBuilder Depth(string value)
        {
            Container.Depth = value;

            return this;
        }
        /// <summary>
        /// The template which renders the footer of the calendar. If false, the footer will not be rendered.
        /// </summary>
        /// <param name="value">The value that configures the footer.</param>
        public DateTimePickerBuilder Footer(string value)
        {
            Container.Footer = value;

            return this;
        }
        /// <summary>
        /// Specifies the format, which is used to format the value of the DateTimePicker displayed in the input. The format also will be used to parse the input.
        /// </summary>
        /// <param name="value">The value that configures the format.</param>
        public DateTimePickerBuilder Format(string value)
        {
            Container.Format = value;

            return this;
        }
        /// <summary>
        /// Specifies the interval, between values in the popup list, in minutes.
        /// </summary>
        /// <param name="value">The value that configures the interval.</param>
        public DateTimePickerBuilder Interval(double value)
        {
            Container.Interval = value;

            return this;
        }
        /// <summary>
        /// Specifies the maximum date, which the calendar can show.
        /// </summary>
        /// <param name="value">The value that configures the max.</param>
        public DateTimePickerBuilder Max(DateTime value)
        {
            Container.Max = value;

            return this;
        }
        /// <summary>
        /// Specifies the minimum date that the calendar can show.
        /// </summary>
        /// <param name="value">The value that configures the min.</param>
        public DateTimePickerBuilder Min(DateTime value)
        {
            Container.Min = value;

            return this;
        }
        /// <summary>
        /// Templates for the cells rendered in the calendar "month" view.
        /// </summary>
        /// <param name="configurator">The configurator for the month setting.</param>
        public DateTimePickerBuilder Month(Action<DateTimePickerMonthSettingsBuilder> configurator)
        {
            configurator(new DateTimePickerMonthSettingsBuilder(Container.Month));
            return this;
        }
        /// <summary>
        /// Specifies the formats, which are used to parse the value set with value() method or by direct input. If not set the value of the options.format and options.timeFormat will be used. Note that value of the format option is always used.
        /// </summary>
        /// <param name="value">The value that configures the parseformats.</param>
        public DateTimePickerBuilder ParseFormats(params string[] value)
        {
            Container.ParseFormats = value;

            return this;
        }
        /// <summary>
        /// Specifies the start view of the calendar.
		///  The following settings are available for the start value:
        /// </summary>
        /// <param name="value">The value that configures the start.</param>
        public DateTimePickerBuilder Start(string value)
        {
            Container.Start = value;

            return this;
        }
        /// <summary>
        /// Specifies the format, which is used to format the values in the time drop-down list.
        /// </summary>
        /// <param name="value">The value that configures the timeformat.</param>
        public DateTimePickerBuilder TimeFormat(string value)
        {
            Container.TimeFormat = value;

            return this;
        }
        /// <summary>
        /// Specifies the selected value.
        /// </summary>
        /// <param name="value">The value that configures the value.</param>
        public DateTimePickerBuilder Value(DateTime value)
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
        /// @(Html.Kendo().DateTimePicker()
        ///       .Name("DateTimePicker")
        ///       .Events(events => events
        ///           .Change("onChange")
        ///       )
        /// )
        /// </code>
        /// </example>
        public DateTimePickerBuilder Events(Action<DateTimePickerEventBuilder> configurator)
        {
            configurator(new DateTimePickerEventBuilder(Container.Events));
            return this;
        }
        
    }
}

