using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI NumericTextBox component
    /// </summary>
    public partial class NumericTextBox<T> where T : struct 
    {
        public string Culture { get; set; }

        public double? Decimals { get; set; }

        public string DownArrowText { get; set; }

        public string Format { get; set; }

        public T? Max { get; set; }

        public T? Min { get; set; }

        public string Placeholder { get; set; }

        public bool? Spinners { get; set; }

        public T? Step { get; set; }

        public string UpArrowText { get; set; }

        public T? Value { get; set; }

        public bool? Enable { get; set; }


        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            if (Culture.HasValue())
            {
                settings["culture"] = Culture;
            }

            if (Decimals.HasValue)
            {
                settings["decimals"] = Decimals;
            }

            if (DownArrowText.HasValue())
            {
                settings["downArrowText"] = DownArrowText;
            }

            if (Format.HasValue())
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

            if (Placeholder.HasValue())
            {
                settings["placeholder"] = Placeholder;
            }

            if (Spinners.HasValue)
            {
                settings["spinners"] = Spinners;
            }

            if (Step.HasValue)
            {
                settings["step"] = Step;
            }

            if (UpArrowText.HasValue())
            {
                settings["upArrowText"] = UpArrowText;
            }

            if (Value.HasValue)
            {
                settings["value"] = Value;
            }

            if (Enable.HasValue)
            {
                settings["enable"] = Enable;
            }

            return settings;
        }
    }
}
