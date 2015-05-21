using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartSeriesExtremesSettings class
    /// </summary>
    public partial class ChartSeriesExtremesSettings 
    {
        public string Background { get; set; }

        public ChartSeriesExtremesBorderSettings Border { get; } = new ChartSeriesExtremesBorderSettings();

        public double? Size { get; set; }

        public string Type { get; set; }

        public double? Rotation { get; set; }


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

            if (Size.HasValue)
            {
                settings["size"] = Size;
            }

            if (Type?.HasValue() == true)
            {
                settings["type"] = Type;
            }

            if (Rotation.HasValue)
            {
                settings["rotation"] = Rotation;
            }

            return settings;
        }
    }
}
