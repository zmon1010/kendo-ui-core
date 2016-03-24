using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.TagHelpers
{
    public partial class NumericTextBoxTagHelper
    {
        public string OnChange { get; set; }

        public string OnSpin { get; set; }


        protected override Dictionary<string, object> SerializeEvents()
        {
            var settings = new Dictionary<string, object>();

            if (OnChange?.HasValue() == true)
            {
                settings["change"] = CreateHandler(OnChange);
            }

            if (OnSpin?.HasValue() == true)
            {
                settings["spin"] = CreateHandler(OnSpin);
            }

            return settings;
        }
    }
}

