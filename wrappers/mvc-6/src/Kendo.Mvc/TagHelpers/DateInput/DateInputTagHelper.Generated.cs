using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Linq;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Kendo.Mvc.TagHelpers
{
    public partial class DateInputTagHelper
    {
        /// <summary>
        /// Specifies the format, which is used to format the value of the DateInput displayed in the input. The format also will be used to parse the input.
        /// </summary>
        public string Format { get; set; }

        /// <summary>
        /// Specifies the maximum date, which the calendar can show.
        /// </summary>
        public DateTime? Max { get; set; }

        /// <summary>
        /// Specifies the minimum date that the calendar can show.
        /// </summary>
        public DateTime? Min { get; set; }

        /// <summary>
        /// Specifies the selected date.
        /// </summary>
        public DateTime? Value { get; set; }

        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            if (Format?.HasValue() == true)
            {
                settings["format"] = Format;
            }

            if (Max.HasValue)
            {
                settings["max"] = Max;
            }

            if (Min.HasValue)
            {
                settings["min"] = Min;
            }

            if (Value.HasValue)
            {
                settings["value"] = Value;
            }

            return settings;
        }
    }
}
