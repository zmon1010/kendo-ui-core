using Kendo.Mvc.Extensions;
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

        public IDictionary<string, object> HtmlAttributes
        {
            get;
            private set;
        } = new Dictionary<string, object>();

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

            if (HtmlAttributes.Any())
            {
                settings["attributes"] = HtmlAttributes;
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

            var tooltip = Tooltip.Serialize();
            if (tooltip.Any())
            {
                settings["tooltip"] = tooltip;
            }

            return settings;
        }
    }
}
