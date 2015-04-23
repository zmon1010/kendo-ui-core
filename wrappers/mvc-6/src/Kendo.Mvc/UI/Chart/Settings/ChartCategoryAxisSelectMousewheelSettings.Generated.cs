using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartCategoryAxisSelectMousewheelSettings class
    /// </summary>
    public partial class ChartCategoryAxisSelectMousewheelSettings 
    {
        public bool? Reverse { get; set; }

        public string Zoom { get; set; }


        public Chart Chart { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Reverse.HasValue)
            {
                settings["reverse"] = Reverse;
            }

            if (Zoom?.HasValue() == true)
            {
                settings["zoom"] = Zoom;
            }

            return settings;
        }
    }
}
