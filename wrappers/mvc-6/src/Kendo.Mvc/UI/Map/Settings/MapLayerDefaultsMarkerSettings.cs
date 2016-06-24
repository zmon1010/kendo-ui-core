using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI MapLayerDefaultsMarkerSettings class
    /// </summary>
    public partial class MapLayerDefaultsMarkerSettings
    {
        private MapMarkerTooltip tooltip;

        public string ShapeName { get; set; }

        public MapMarkerTooltip Tooltip
        {
            get
            {
                if (tooltip == null)
                {
                    tooltip = new MapMarkerTooltip(Map.ViewContext);
                }

                return tooltip;
            }
        }

        public Dictionary<string, object> Serialize()
        {
            var settings = SerializeSettings();

            var tooltip = Tooltip.Serialize();
            if (tooltip.Any())
            {
                settings["tooltip"] = tooltip;
            }

            if (ShapeName.HasValue())
            {
                settings["shape"] = ShapeName;
            }
            else if (Shape.HasValue)
            {
                var shapeName = Shape.ToString();
                settings["shape"] = shapeName.ToLowerInvariant()[0] + shapeName.Substring(1);
            }

            return settings;
        }
    }
}
