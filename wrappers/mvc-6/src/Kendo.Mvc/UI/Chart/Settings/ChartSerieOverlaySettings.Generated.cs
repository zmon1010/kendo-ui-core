using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartSerieOverlaySettings class
    /// </summary>
    public partial class ChartSerieOverlaySettings 
    {
        public string Gradient { get; set; }


        public Chart Chart { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Gradient?.HasValue() == true)
            {
                settings["gradient"] = Gradient;
            }

            return settings;
        }
    }
}
