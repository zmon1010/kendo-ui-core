using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring DateInputMessagesSettings
    /// </summary>
    public partial class DateInputMessagesSettingsBuilder
        
    {
        /// <summary>
        /// The placeholder for the years part.
        /// </summary>
        /// <param name="value">The value for Year</param>
        public DateInputMessagesSettingsBuilder Year(string value)
        {
            Container.Year = value;
            return this;
        }

        /// <summary>
        /// The placeholder for the months part.
        /// </summary>
        /// <param name="value">The value for Month</param>
        public DateInputMessagesSettingsBuilder Month(string value)
        {
            Container.Month = value;
            return this;
        }

        /// <summary>
        /// The placeholder for the day of the month part.
        /// </summary>
        /// <param name="value">The value for Day</param>
        public DateInputMessagesSettingsBuilder Day(string value)
        {
            Container.Day = value;
            return this;
        }

        /// <summary>
        /// The placeholder for the day of the week part.
        /// </summary>
        /// <param name="value">The value for Weekday</param>
        public DateInputMessagesSettingsBuilder Weekday(string value)
        {
            Container.Weekday = value;
            return this;
        }

        /// <summary>
        /// The placeholder for the hours part.
        /// </summary>
        /// <param name="value">The value for Hour</param>
        public DateInputMessagesSettingsBuilder Hour(string value)
        {
            Container.Hour = value;
            return this;
        }

        /// <summary>
        /// The placeholder for the minutes part.
        /// </summary>
        /// <param name="value">The value for Minute</param>
        public DateInputMessagesSettingsBuilder Minute(string value)
        {
            Container.Minute = value;
            return this;
        }

        /// <summary>
        /// The placeholder for the seconds part.
        /// </summary>
        /// <param name="value">The value for Second</param>
        public DateInputMessagesSettingsBuilder Second(string value)
        {
            Container.Second = value;
            return this;
        }

        /// <summary>
        /// The placeholder for the AM/PM part.
        /// </summary>
        /// <param name="value">The value for Dayperiod</param>
        public DateInputMessagesSettingsBuilder Dayperiod(string value)
        {
            Container.Dayperiod = value;
            return this;
        }

    }
}
