using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI MapMarker class
    /// </summary>
    public partial class MapMarker : MapBaseLayerSettings
    {
        public IDictionary<string, object> HtmlAttributes
        {
            get;
            private set;
        } = new Dictionary<string, object>();

        public string ShapeName { get; set; }

        protected override ViewContext ViewContext
        {
            get
            {
                return Map?.ViewContext;
            }
        }

        public Dictionary<string, object> Serialize()
        {
            var settings = SerializeSettings();

            if (HtmlAttributes.Any())
            {
                settings["attributes"] = HtmlAttributes;
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

            SerializeTooltip(settings);

            return settings;
        }
    }
}
