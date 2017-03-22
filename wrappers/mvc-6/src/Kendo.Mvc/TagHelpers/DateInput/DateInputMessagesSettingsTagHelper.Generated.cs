using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Linq;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Kendo.Mvc.TagHelpers
{
    public partial class DateInputMessagesSettingsTagHelper
    {
        /// <summary>
        /// The placeholder for the years part.
        /// </summary>
        public string Year { get; set; }

        /// <summary>
        /// The placeholder for the months part.
        /// </summary>
        public string Month { get; set; }

        /// <summary>
        /// The placeholder for the day of the month part.
        /// </summary>
        public string Day { get; set; }

        /// <summary>
        /// The placeholder for the day of the week part.
        /// </summary>
        public string Weekday { get; set; }

        /// <summary>
        /// The placeholder for the hours part.
        /// </summary>
        public string Hour { get; set; }

        /// <summary>
        /// The placeholder for the minutes part.
        /// </summary>
        public string Minute { get; set; }

        /// <summary>
        /// The placeholder for the seconds part.
        /// </summary>
        public string Second { get; set; }

        /// <summary>
        /// The placeholder for the AM/PM part.
        /// </summary>
        public string Dayperiod { get; set; }

        internal Dictionary<string, object> Serialize()
        {
            var settings = new Dictionary<string, object>();

            if (Year?.HasValue() == true)
            {
                settings["year"] = Year;
            }

            if (Month?.HasValue() == true)
            {
                settings["month"] = Month;
            }

            if (Day?.HasValue() == true)
            {
                settings["day"] = Day;
            }

            if (Weekday?.HasValue() == true)
            {
                settings["weekday"] = Weekday;
            }

            if (Hour?.HasValue() == true)
            {
                settings["hour"] = Hour;
            }

            if (Minute?.HasValue() == true)
            {
                settings["minute"] = Minute;
            }

            if (Second?.HasValue() == true)
            {
                settings["second"] = Second;
            }

            if (Dayperiod?.HasValue() == true)
            {
                settings["dayperiod"] = Dayperiod;
            }

            return settings;
        }
    }
}
