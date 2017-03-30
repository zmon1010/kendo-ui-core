namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DateInputMessagesSettings settings.
    /// </summary>
    public class DateInputMessagesSettingsBuilder: IHideObjectMembers
    {
        private readonly DateInputMessagesSettings container;

        public DateInputMessagesSettingsBuilder(DateInputMessagesSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The placeholder for the years part.
        /// </summary>
        /// <param name="value">The value that configures the year.</param>
        public DateInputMessagesSettingsBuilder Year(string value)
        {
            container.Year = value;

            return this;
        }
        
        /// <summary>
        /// The placeholder for the months part.
        /// </summary>
        /// <param name="value">The value that configures the month.</param>
        public DateInputMessagesSettingsBuilder Month(string value)
        {
            container.Month = value;

            return this;
        }
        
        /// <summary>
        /// The placeholder for the day of the month part.
        /// </summary>
        /// <param name="value">The value that configures the day.</param>
        public DateInputMessagesSettingsBuilder Day(string value)
        {
            container.Day = value;

            return this;
        }
        
        /// <summary>
        /// The placeholder for the day of the week part.
        /// </summary>
        /// <param name="value">The value that configures the weekday.</param>
        public DateInputMessagesSettingsBuilder Weekday(string value)
        {
            container.Weekday = value;

            return this;
        }
        
        /// <summary>
        /// The placeholder for the hours part.
        /// </summary>
        /// <param name="value">The value that configures the hour.</param>
        public DateInputMessagesSettingsBuilder Hour(string value)
        {
            container.Hour = value;

            return this;
        }
        
        /// <summary>
        /// The placeholder for the minutes part.
        /// </summary>
        /// <param name="value">The value that configures the minute.</param>
        public DateInputMessagesSettingsBuilder Minute(string value)
        {
            container.Minute = value;

            return this;
        }
        
        /// <summary>
        /// The placeholder for the seconds part.
        /// </summary>
        /// <param name="value">The value that configures the second.</param>
        public DateInputMessagesSettingsBuilder Second(string value)
        {
            container.Second = value;

            return this;
        }
        
        /// <summary>
        /// The placeholder for the AM/PM part.
        /// </summary>
        /// <param name="value">The value that configures the dayperiod.</param>
        public DateInputMessagesSettingsBuilder Dayperiod(string value)
        {
            container.Dayperiod = value;

            return this;
        }
        
        //<< Fields
    }
}

