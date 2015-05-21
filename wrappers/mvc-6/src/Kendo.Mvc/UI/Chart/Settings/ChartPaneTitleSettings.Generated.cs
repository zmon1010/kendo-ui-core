using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartPaneTitleSettings class
    /// </summary>
    public partial class ChartPaneTitleSettings 
    {
        public string Background { get; set; }

        public ChartPaneTitleBorderSettings Border { get; } = new ChartPaneTitleBorderSettings();

        public string Color { get; set; }

        public string Font { get; set; }

        public ChartPaneTitleMarginSettings Margin { get; } = new ChartPaneTitleMarginSettings();

        public string Position { get; set; }

        public string Text { get; set; }

        public bool? Visible { get; set; }

        public ClientHandlerDescriptor Visual { get; set; }


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

            if (Color?.HasValue() == true)
            {
                settings["color"] = Color;
            }

            if (Font?.HasValue() == true)
            {
                settings["font"] = Font;
            }

            var margin = Margin.Serialize();
            if (margin.Any())
            {
                settings["margin"] = margin;
            }

            if (Position?.HasValue() == true)
            {
                settings["position"] = Position;
            }

            if (Text?.HasValue() == true)
            {
                settings["text"] = Text;
            }

            if (Visible.HasValue)
            {
                settings["visible"] = Visible;
            }

            if (Visual?.HasValue() == true)
            {
                settings["visual"] = Visual;
            }

            return settings;
        }
    }
}
