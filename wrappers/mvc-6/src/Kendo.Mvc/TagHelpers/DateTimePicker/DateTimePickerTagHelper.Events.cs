using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.TagHelpers
{
    public partial class DateTimePickerTagHelper
    {
        public string OnChange { get; set; }

        public string OnClose { get; set; }

        public string OnOpen { get; set; }


        protected override Dictionary<string, object> SerializeEvents()
        {
            var settings = new Dictionary<string, object>();

            if (OnChange?.HasValue() == true)
            {
                settings["change"] = CreateHandler(OnChange);
            }

            if (OnClose?.HasValue() == true)
            {
                settings["close"] = CreateHandler(OnClose);
            }

            if (OnOpen?.HasValue() == true)
            {
                settings["open"] = CreateHandler(OnOpen);
            }

            return settings;
        }
    }
}

