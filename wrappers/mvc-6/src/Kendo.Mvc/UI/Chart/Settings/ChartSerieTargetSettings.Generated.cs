using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartSerieTargetSettings class
    /// </summary>
    public partial class ChartSerieTargetSettings 
    {
        public ChartSerieTargetBorderSettings Border { get; } = new ChartSerieTargetBorderSettings();

        public string Color { get; set; }

        public ChartSerieTargetLineSettings Line { get; } = new ChartSerieTargetLineSettings();


        public Chart Chart { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            var border = Border.Serialize();
            if (border.Any())
            {
                settings["border"] = border;
            }

            if (Color?.HasValue() == true)
            {
                settings["color"] = Color;
            }

            var line = Line.Serialize();
            if (line.Any())
            {
                settings["line"] = line;
            }

            return settings;
        }
    }
}
