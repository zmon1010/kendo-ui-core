using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartLegendSettings class
    /// </summary>
    public partial class ChartLegendSettings 
    {
        public string Align { get; set; }

        public string Background { get; set; }

        public ChartLegendBorderSettings Border { get; } = new ChartLegendBorderSettings();

        public double? Height { get; set; }

        public ChartLegendInactiveItemsSettings InactiveItems { get; } = new ChartLegendInactiveItemsSettings();

        public ChartLegendItemSettings Item { get; } = new ChartLegendItemSettings();

        public ChartLegendLabelsSettings Labels { get; } = new ChartLegendLabelsSettings();

        public ChartLegendMarginSettings Margin { get; } = new ChartLegendMarginSettings();

        public double? OffsetX { get; set; }

        public double? OffsetY { get; set; }

        public string Orientation { get; set; }

        public ChartLegendPaddingSettings Padding { get; } = new ChartLegendPaddingSettings();

        public string Position { get; set; }

        public bool? Reverse { get; set; }

        public bool? Visible { get; set; }

        public double? Width { get; set; }


        public Chart Chart { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Align?.HasValue() == true)
            {
                settings["align"] = Align;
            }

            if (Background?.HasValue() == true)
            {
                settings["background"] = Background;
            }

            var border = Border.Serialize();
            if (border.Any())
            {
                settings["border"] = border;
            }

            if (Height.HasValue)
            {
                settings["height"] = Height;
            }

            var inactiveItems = InactiveItems.Serialize();
            if (inactiveItems.Any())
            {
                settings["inactiveItems"] = inactiveItems;
            }

            var item = Item.Serialize();
            if (item.Any())
            {
                settings["item"] = item;
            }

            var labels = Labels.Serialize();
            if (labels.Any())
            {
                settings["labels"] = labels;
            }

            var margin = Margin.Serialize();
            if (margin.Any())
            {
                settings["margin"] = margin;
            }

            if (OffsetX.HasValue)
            {
                settings["offsetX"] = OffsetX;
            }

            if (OffsetY.HasValue)
            {
                settings["offsetY"] = OffsetY;
            }

            if (Orientation?.HasValue() == true)
            {
                settings["orientation"] = Orientation;
            }

            var padding = Padding.Serialize();
            if (padding.Any())
            {
                settings["padding"] = padding;
            }

            if (Position?.HasValue() == true)
            {
                settings["position"] = Position;
            }

            if (Reverse.HasValue)
            {
                settings["reverse"] = Reverse;
            }

            if (Visible.HasValue)
            {
                settings["visible"] = Visible;
            }

            if (Width.HasValue)
            {
                settings["width"] = Width;
            }

            return settings;
        }
    }
}
