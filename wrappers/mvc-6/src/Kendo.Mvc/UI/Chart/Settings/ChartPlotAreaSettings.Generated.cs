using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartPlotAreaSettings class
    /// </summary>
    public partial class ChartPlotAreaSettings 
    {
        public string Background { get; set; }

        public ChartPlotAreaBorderSettings Border { get; } = new ChartPlotAreaBorderSettings();

        public ChartPlotAreaMarginSettings Margin { get; } = new ChartPlotAreaMarginSettings();

        public double? Opacity { get; set; }

        public ChartPlotAreaPaddingSettings Padding { get; } = new ChartPlotAreaPaddingSettings();


        public Chart Chart { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Background?.HasValue() == true)
            {
                settings["background"] = Background;
            }

            var border = Border.Serialize();
            if (border.Any())
            {
                settings["border"] = border;
            }

            var margin = Margin.Serialize();
            if (margin.Any())
            {
                settings["margin"] = margin;
            }

            if (Opacity.HasValue)
            {
                settings["opacity"] = Opacity;
            }

            var padding = Padding.Serialize();
            if (padding.Any())
            {
                settings["padding"] = padding;
            }

            return settings;
        }
    }
}
