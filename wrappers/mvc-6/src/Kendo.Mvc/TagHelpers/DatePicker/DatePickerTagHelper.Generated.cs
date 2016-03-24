using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Linq;

namespace Kendo.Mvc.TagHelpers
{
    public partial class DatePickerTagHelper
    {
        public string Culture { get; set; }

        public string Footer { get; set; }

        public string Format { get; set; }

        public DateTime? Max { get; set; }

        public DateTime? Min { get; set; }

        public string[] ParseFormats { get; set; }

        public DateTime? Value { get; set; }

        public CalendarView? Start { get; set; }

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
