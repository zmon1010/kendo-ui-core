using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI MapLayerDefaultsMarkerTooltipAnimationCloseSettings class
    /// </summary>
    public partial class MapLayerDefaultsMarkerTooltipAnimationCloseSettings 
    {
        public string Effects { get; set; }

        public double? Duration { get; set; }


        public Map Map { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Effects?.HasValue() == true)
            {
                settings["effects"] = Effects;
            }

            if (Duration.HasValue)
            {
                settings["duration"] = Duration;
            }

            return settings;
        }
    }
}
