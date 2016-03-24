using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.TagHelpers
{
    public partial class ButtonTagHelper
    {
        public string OnClick { get; set; }


        protected override Dictionary<string, object> SerializeEvents()
        {
            var settings = new Dictionary<string, object>();

            if (OnClick?.HasValue() == true)
            {
                settings["click"] = CreateHandler(OnClick);
            }

            return settings;
        }
    }
}

