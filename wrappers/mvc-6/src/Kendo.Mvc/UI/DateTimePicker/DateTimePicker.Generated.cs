using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI DateTimePicker component
    /// </summary>
    public partial class DateTimePicker 
    {
        public string ARIATemplate { get; set; }

        public string ARIATemplateId { get; set; }

        public string Culture { get; set; }

        public DateTime[] Dates { get; set; }

        public string Footer { get; set; }

        public string Format { get; set; }

        public double? Interval { get; set; }

        public DateTime? Max { get; set; }

        public DateTime? Min { get; set; }

        public string[] ParseFormats { get; set; }

        public string TimeFormat { get; set; }

        public DateTime? Value { get; set; }

        public CalendarView? Start { get; set; }

        public CalendarView? Depth { get; set; }

        public DateTimePickerMonthTemplateSettings MonthTemplate { get; } = new DateTimePickerMonthTemplateSettings();


        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            if (ARIATemplateId.HasValue())
            {
                settings["ARIATemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('#{0}').html()", ARIATemplateId
                    )
                };
            }
            else if (ARIATemplate.HasValue())
            {
                settings["ARIATemplate"] = ARIATemplate;
            }

            if (Culture.HasValue())
            {
                settings["culture"] = Culture;
            }

            if (Dates != null && Dates.Any())
            {
                settings["dates"] = Dates;
            }

            if (Format.HasValue())
            {
                settings["format"] = Format;
            }

            if (Interval.HasValue)
            {
                settings["interval"] = Interval;
            }

            if (Max.HasValue)
            {
                settings["max"] = Max;
            }

            if (Min.HasValue)
            {
                settings["min"] = Min;
            }

            if (ParseFormats != null && ParseFormats.Any())
            {
                settings["parseFormats"] = ParseFormats;
            }

            if (TimeFormat.HasValue())
            {
                settings["timeFormat"] = TimeFormat;
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
