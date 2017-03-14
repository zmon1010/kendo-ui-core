using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.TagHelpers
{
    public partial class DateInputTagHelper
    {
        /// <summary>
        /// Fires when the selected date is changed
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the change event.</param>
        public string OnChange { get; set; }


        protected override Dictionary<string, object> SerializeEvents()
        {
            var settings = new Dictionary<string, object>();

            if (OnChange?.HasValue() == true)
            {
                settings["change"] = CreateHandler(OnChange);
            }

            return settings;
        }
    }
}

