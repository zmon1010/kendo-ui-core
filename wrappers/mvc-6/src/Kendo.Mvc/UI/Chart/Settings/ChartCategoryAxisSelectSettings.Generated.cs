using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartCategoryAxisSelectSettings class
    /// </summary>
    public partial class ChartCategoryAxisSelectSettings 
    {
        public object From { get; set; }

        public object Max { get; set; }

        public object Min { get; set; }

        public ChartCategoryAxisSelectMousewheelSettings Mousewheel { get; } = new ChartCategoryAxisSelectMousewheelSettings();

        public object To { get; set; }


        public Chart Chart { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (From != null)
            {
                settings["from"] = From;
            }

            if (Max != null)
            {
                settings["max"] = Max;
            }

            if (Min != null)
            {
                settings["min"] = Min;
            }

            var mousewheel = Mousewheel.Serialize();
            if (mousewheel.Any())
            {
                settings["mousewheel"] = mousewheel;
            }

            if (To != null)
            {
                settings["to"] = To;
            }

            return settings;
        }
    }
}
