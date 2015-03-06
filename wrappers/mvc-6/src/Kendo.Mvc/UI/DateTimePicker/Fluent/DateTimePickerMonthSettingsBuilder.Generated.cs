using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring DateTimePickerMonthSettings
    /// </summary>
    public partial class DateTimePickerMonthSettingsBuilder
        
    {
        /// <summary>
        /// Template to be used for rendering the cells in the calendar "month" view, which are in range.
        /// </summary>
        /// <param name="value">The value that configures the content.</param>
        public DateTimePickerMonthSettingsBuilder Content(string value)
        {
            Container.Content = value;

            return this;
        }
        /// <summary>
        /// The template used for rendering cells in the calendar "month" view, which are outside the min/max range.
        /// </summary>
        /// <param name="value">The value that configures the empty.</param>
        public DateTimePickerMonthSettingsBuilder Empty(string value)
        {
            Container.Empty = value;

            return this;
        }

    }
}
