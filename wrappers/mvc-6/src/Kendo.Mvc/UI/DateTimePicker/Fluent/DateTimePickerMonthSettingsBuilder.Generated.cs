using System;
using System.Collections.Generic;

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
        /// <param name="value">The value for Content</param>
        public DateTimePickerMonthSettingsBuilder Content(string value)
        {
            Container.Content = value;
            return this;
        }

        /// <summary>
        /// The template used for rendering cells in the calendar "month" view, which are outside the min/max range.
        /// </summary>
        /// <param name="value">The value for Empty</param>
        public DateTimePickerMonthSettingsBuilder Empty(string value)
        {
            Container.Empty = value;
            return this;
        }

    }
}
