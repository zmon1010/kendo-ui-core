using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartSeriesHighlightLineSettings class
    /// </summary>
    public partial class ChartSeriesHighlightLineSettings 
    {
        public string Color { get; set; }

        public double? Opacity { get; set; }

        public double? Width { get; set; }


        public Chart Chart { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Color?.HasValue() == true)
            {
                settings["color"] = Color;
            }

            if (Opacity.HasValue)
            {
                settings["opacity"] = Opacity;
            }

            if (Width.HasValue)
            {
                settings["width"] = Width;
            }

            return settings;
        }
    }
}
