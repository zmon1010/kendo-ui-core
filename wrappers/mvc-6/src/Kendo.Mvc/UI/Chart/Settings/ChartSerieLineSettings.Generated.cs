using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartSerieLineSettings class
    /// </summary>
    public partial class ChartSerieLineSettings 
    {
        public string Color { get; set; }

        public double? Opacity { get; set; }

        public string Width { get; set; }

        public string Style { get; set; }


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

            if (Width?.HasValue() == true)
            {
                settings["width"] = Width;
            }

            if (Style?.HasValue() == true)
            {
                settings["style"] = Style;
            }

            return settings;
        }
    }
}
