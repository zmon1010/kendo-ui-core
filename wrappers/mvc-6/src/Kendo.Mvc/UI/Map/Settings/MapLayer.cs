using Kendo.Mvc.Extensions;
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

        public string ShapeName { get; set; }

        public string SymbolName { get; set; }

        public ClientHandlerDescriptor SymbolHandler { get; set; }

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

            if (ShapeName.HasValue())
            {
                settings["shape"] = ShapeName;
            }
            else if (Shape.HasValue)
            {
                var shapeName = Shape.ToString();
                settings["shape"] = shapeName.ToLowerInvariant()[0] + shapeName.Substring(1);
            }

            if (SymbolHandler != null)
            {
                settings["symbol"] = SymbolHandler;
            }
            else if (SymbolName.HasValue())
            {
                settings["symbol"] = SymbolName;
            }
            else if (Symbol.HasValue)
            {
                settings["symbol"] = Symbol.ToString().ToLowerInvariant();
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
