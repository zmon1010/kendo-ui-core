using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.TagHelpers
{
    public partial class NumericTextBoxTagHelper
    {
        public string Culture { get; set; }

        public double? Decimals { get; set; }

        public string DownArrowText { get; set; }

        public string Format { get; set; }

        public object Max { get; set; }

        public object Min { get; set; }

        public string Placeholder { get; set; }

        public bool? Spinners { get; set; }

        public object Step { get; set; }

        public string UpArrowText { get; set; }

        public object Value { get; set; }

        public bool? Enable { get; set; }


        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            if (Culture?.HasValue() == true)
            {
                settings["culture"] = Culture;
            }

            if (Decimals.HasValue)
            {
                settings["decimals"] = Decimals;
            }

            if (DownArrowText?.HasValue() == true)
            {
                settings["downArrowText"] = DownArrowText;
            }

            if (Format?.HasValue() == true)
            {
                settings["format"] = Format;
            }

            if (Placeholder?.HasValue() == true)
            {
                settings["placeholder"] = Placeholder;
            }

            if (Spinners.HasValue)
            {
                settings["spinners"] = Spinners;
            }

            if (UpArrowText?.HasValue() == true)
            {
                settings["upArrowText"] = UpArrowText;
            }

            return settings;
        }
    }
}
