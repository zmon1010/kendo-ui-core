using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI DateInputMessagesSettings class
    /// </summary>
    public partial class DateInputMessagesSettings 
    {
        public string Year { get; set; }

        public string Month { get; set; }

        public string Day { get; set; }

        public string Weekday { get; set; }

        public string Hour { get; set; }

        public string Minute { get; set; }

        public string Second { get; set; }

        public string Dayperiod { get; set; }


        public DateInput DateInput { get; set; }

        protected Dictionary<string, object> SerializeSettings()
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
