using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI MapLayer class
    /// </summary>
    public partial class MapLayer
    {
        private MapMarkerTooltip tooltip;

        public DataSource DataSource { get; set; }

        public MapMarkerTooltip Tooltip {
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

            if (DataSource != null)
            {
                settings["dataSource"] = DataSource.ToJson();
            }

            var tooltip = Tooltip.Serialize();
            if (tooltip.Any())
            {
                settings["tooltip"] = tooltip;
            }

            return settings;
        }
    }
}
