using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Linq;

namespace Kendo.Mvc.TagHelpers
{
    public partial class DatePickerTagHelper
    {
        /// <summary>
        /// Specifies the culture info used by the widget.
        /// </summary>
        public string Culture { get; set; }

        /// <summary>
        /// The template which renders the footer of the calendar. If false, the footer will not be rendered.
        /// </summary>
        public string Footer { get; set; }

        /// <summary>
        /// Specifies the format, which is used to format the value of the DatePicker displayed in the input. The format also will be used to parse the input.
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
        /// Specifies a list of date formats used to parse the value set with value() method or by direct user input. If not set the value of the format will be used.
		///  Note that the format option is always used during parsing.
        /// </summary>
        public string[] ParseFormats { get; set; }

        /// <summary>
        /// Specifies the selected date.
        /// </summary>
        public DateTime? Value { get; set; }

        /// <summary>
        /// Specifies the start view of the calendar.
        /// </summary>
        public CalendarView? Start { get; set; }

        /// <summary>
        /// Specifies the navigation depth.
        /// </summary>
        public CalendarView? Depth { get; set; }


        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            if (Culture?.HasValue() == true)
            {
                settings["culture"] = Culture;
            }

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

            if (ParseFormats?.Any() == true)
            {
                settings["parseFormats"] = ParseFormats;
            }

            if (Value.HasValue)
            {
                settings["value"] = Value;
            }

            if (Start.HasValue)
            {
                settings["start"] = Start?.Serialize();
            }

            if (Depth.HasValue)
            {
                settings["depth"] = Depth?.Serialize();
            }

            return settings;
        }
    }
}
