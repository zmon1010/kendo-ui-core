using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI FlatColorPickerMessagesSettings class
    /// </summary>
    public partial class FlatColorPickerMessagesSettings 
    {
        public string Apply { get; set; }

        public string Cancel { get; set; }

        public string IdPrefix { get; set; } = "#";

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();


            if (Apply.HasValue())
            {
                settings["apply"] = Apply;
            }

            if (Cancel.HasValue())
            {
                settings["cancel"] = Cancel;
            }

            return settings;
        }

    }
}
