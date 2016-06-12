using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI MapLayerDefaultsMarkerTooltipSettings class
    /// </summary>
    public partial class MapLayerDefaultsMarkerTooltipSettings 
    {
        public bool? AutoHide { get; set; }

        public MapLayerDefaultsMarkerTooltipAnimationSettings Animation { get; } = new MapLayerDefaultsMarkerTooltipAnimationSettings();

        public MapLayerDefaultsMarkerTooltipContentSettings Content { get; } = new MapLayerDefaultsMarkerTooltipContentSettings();

        public string Template { get; set; }

        public string TemplateId { get; set; }

        public bool? Callout { get; set; }

        public bool? Iframe { get; set; }

        public double? Height { get; set; }

        public double? Width { get; set; }

        public string Position { get; set; }

        public double? ShowAfter { get; set; }

        public string ShowOn { get; set; }


        public Map Map { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (AutoHide.HasValue)
            {
                settings["autoHide"] = AutoHide;
            }

            var animation = Animation.Serialize();
            if (animation.Any())
            {
                settings["animation"] = animation;
            }

            var content = Content.Serialize();
            if (content.Any())
            {
                settings["content"] = content;
            }

            if (TemplateId.HasValue())
            {
                settings["template"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('{0}{1}').html()", Map.IdPrefix, TemplateId
                    )
                };
            }
            else if (Template.HasValue())
            {
                settings["template"] = Template;
            }

            if (Callout.HasValue)
            {
                settings["callout"] = Callout;
            }

            if (Iframe.HasValue)
            {
                settings["iframe"] = Iframe;
            }

            if (Height.HasValue)
            {
                settings["height"] = Height;
            }

            if (Width.HasValue)
            {
                settings["width"] = Width;
            }

            if (Position?.HasValue() == true)
            {
                settings["position"] = Position;
            }

            if (ShowAfter.HasValue)
            {
                settings["showAfter"] = ShowAfter;
            }

            if (ShowOn?.HasValue() == true)
            {
                settings["showOn"] = ShowOn;
            }

            return settings;
        }
    }
}
