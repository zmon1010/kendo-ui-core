using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartZoomableMousewheelSettings class
    /// </summary>
    public partial class ChartZoomableMousewheelSettings 
    {
        public string Lock { get; set; }

        public bool Enabled { get; set; }

        public Chart Chart { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Lock?.HasValue() == true)
            {
                settings["lock"] = Lock;
            }

            return settings;
        }
    }
}
