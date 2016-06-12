using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI MapMarkerDefaultsTooltipAnimationSettings class
    /// </summary>
    public partial class MapMarkerDefaultsTooltipAnimationSettings 
    {
        public MapMarkerDefaultsTooltipAnimationCloseSettings Close { get; } = new MapMarkerDefaultsTooltipAnimationCloseSettings();

        public MapMarkerDefaultsTooltipAnimationOpenSettings Open { get; } = new MapMarkerDefaultsTooltipAnimationOpenSettings();


        public Map Map { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            var close = Close.Serialize();
            if (close.Any())
            {
                settings["close"] = close;
            }

            var open = Open.Serialize();
            if (open.Any())
            {
                settings["open"] = open;
            }

            return settings;
        }
    }
}
