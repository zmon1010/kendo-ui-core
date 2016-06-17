using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI MapMarker class
    /// </summary>
    public partial class MapMarker 
    {
        private MapMarkerTooltip tooltip;

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

            return settings;
        }
    }
}
