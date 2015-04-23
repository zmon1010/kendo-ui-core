using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartPane class
    /// </summary>
    public partial class ChartPane 
    {
        public string Background { get; set; }

        public ChartPaneBorderSettings Border { get; } = new ChartPaneBorderSettings();

        public bool? Clip { get; set; }

        public double? Height { get; set; }

        public ChartPaneMarginSettings Margin { get; } = new ChartPaneMarginSettings();

        public string Name { get; set; }

        public ChartPanePaddingSettings Padding { get; } = new ChartPanePaddingSettings();

        public ChartPaneTitleSettings Title { get; } = new ChartPaneTitleSettings();


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

            if (Clip.HasValue)
            {
                settings["clip"] = Clip;
            }

            if (Height.HasValue)
            {
                settings["height"] = Height;
            }

            var margin = Margin.Serialize();
            if (margin.Any())
            {
                settings["margin"] = margin;
            }

            if (Name?.HasValue() == true)
            {
                settings["name"] = Name;
            }

            var padding = Padding.Serialize();
            if (padding.Any())
            {
                settings["padding"] = padding;
            }

            var title = Title.Serialize();
            if (title.Any())
            {
                settings["title"] = title;
            }

            return settings;
        }
    }
}
