using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartTitleSettings class
    /// </summary>
    public partial class ChartTitleSettings 
    {
        public string Align { get; set; }

        public string Background { get; set; }

        public ChartTitleBorderSettings Border { get; } = new ChartTitleBorderSettings();

        public string Color { get; set; }

        public string Font { get; set; }

        public ChartTitleMarginSettings Margin { get; } = new ChartTitleMarginSettings();

        public ChartTitlePaddingSettings Padding { get; } = new ChartTitlePaddingSettings();

        public string Position { get; set; }

        public string Text { get; set; }

        public bool? Visible { get; set; }


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

            var padding = Padding.Serialize();
            if (padding.Any())
            {
                settings["padding"] = padding;
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

            return settings;
        }
    }
}
