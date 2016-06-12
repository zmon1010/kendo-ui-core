using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI MapMarkerTooltipSettings class
    /// </summary>
    public partial class MapMarkerTooltipSettings 
    {
        public bool? AutoHide { get; set; }

        public MapMarkerTooltipAnimationSettings Animation { get; } = new MapMarkerTooltipAnimationSettings();

        public MapMarkerTooltipContentSettings Content { get; } = new MapMarkerTooltipContentSettings();

        public string Template { get; set; }

        public string TemplateId { get; set; }

        public bool? Callout { get; set; }

        public bool? Iframe { get; set; }

        public double? Height { get; set; }

        public double? Width { get; set; }

        public double? ShowAfter { get; set; }

        public string ShowOn { get; set; }

        public MapMarkerTooltipPosition? Position { get; set; }


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

            if (ShowAfter.HasValue)
            {
                settings["showAfter"] = ShowAfter;
            }

            if (ShowOn?.HasValue() == true)
            {
                settings["showOn"] = ShowOn;
            }

            if (Position.HasValue)
            {
                settings["position"] = Position?.Serialize();
            }

            return settings;
        }
    }
}
