using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartZoomableSelectionSettings class
    /// </summary>
    public partial class ChartZoomableSelectionSettings<T> where T : class 
    {
        public string Key { get; set; }

        public string Lock { get; set; }

        public bool? Enabled { get; set; }

        public Chart<T> Chart { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Key?.HasValue() == true)
            {
                settings["key"] = Key;
            }

            if (Lock?.HasValue() == true)
            {
                settings["lock"] = Lock;
            }

            return settings;
        }
    }
}
