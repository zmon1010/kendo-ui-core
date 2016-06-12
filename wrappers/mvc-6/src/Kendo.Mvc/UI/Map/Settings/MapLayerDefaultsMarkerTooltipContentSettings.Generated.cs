using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI MapLayerDefaultsMarkerTooltipContentSettings class
    /// </summary>
    public partial class MapLayerDefaultsMarkerTooltipContentSettings 
    {
        public string Url { get; set; }


        public Map Map { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Url?.HasValue() == true)
            {
                settings["url"] = Url;
            }

            return settings;
        }
    }
}
