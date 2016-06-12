using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapLayerDefaultsMarkerTooltipSettings
    /// </summary>
    public partial class MapLayerDefaultsMarkerTooltipSettingsBuilder
        
    {
        /// <summary>
        /// Specifies if the tooltip will be hidden when mouse leaves the target element. If set to false a close button will be shown within tooltip. If set to false, showAfter is specified and the showOn is set to "mouseenter" the Tooltip will be displayed after the given timeout even if the element is no longer hovered.
        /// </summary>
        /// <param name="value">The value for AutoHide</param>
        public MapLayerDefaultsMarkerTooltipSettingsBuilder AutoHide(bool value)
        {
            Container.AutoHide = value;
            return this;
        }

        /// <summary>
        /// A collection of {Animation} objects, used to change default animations. A value of false
		/// will disable all animations in the widget.
        /// </summary>
        /// <param name="configurator">The configurator for the animation setting.</param>
        public MapLayerDefaultsMarkerTooltipSettingsBuilder Animation(Action<MapLayerDefaultsMarkerTooltipAnimationSettingsBuilder> configurator)
        {

            Container.Animation.Map = Container.Map;
            configurator(new MapLayerDefaultsMarkerTooltipAnimationSettingsBuilder(Container.Animation));

            return this;
        }

        /// <summary>
        /// The text or a function which result will be shown within the tooltip.
		/// By default the tooltip will display the target element title attribute content.
        /// </summary>
        /// <param name="configurator">The configurator for the content setting.</param>
        public MapLayerDefaultsMarkerTooltipSettingsBuilder Content(Action<MapLayerDefaultsMarkerTooltipContentSettingsBuilder> configurator)
        {

            Container.Content.Map = Container.Map;
            configurator(new MapLayerDefaultsMarkerTooltipContentSettingsBuilder(Container.Content));

            return this;
        }

        /// <summary>
        /// The template which renders the tooltip content.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value for Template</param>
        public MapLayerDefaultsMarkerTooltipSettingsBuilder Template(string value)
        {
            Container.Template = value;
            return this;
        }

        /// <summary>
        /// The template which renders the tooltip content.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The ID of the template element for Template</param>
        public MapLayerDefaultsMarkerTooltipSettingsBuilder TemplateId(string templateId)
        {
            Container.TemplateId = templateId;
            return this;
        }

        /// <summary>
        /// Specifies if the tooltip callout will be displayed.
        /// </summary>
        /// <param name="value">The value for Callout</param>
        public MapLayerDefaultsMarkerTooltipSettingsBuilder Callout(bool value)
        {
            Container.Callout = value;
            return this;
        }

        /// <summary>
        /// Explicitly states whether content iframe should be created.
        /// </summary>
        /// <param name="value">The value for Iframe</param>
        public MapLayerDefaultsMarkerTooltipSettingsBuilder Iframe(bool value)
        {
            Container.Iframe = value;
            return this;
        }

        /// <summary>
        /// The height (in pixels) of the tooltip.
        /// </summary>
        /// <param name="value">The value for Height</param>
        public MapLayerDefaultsMarkerTooltipSettingsBuilder Height(double value)
        {
            Container.Height = value;
            return this;
        }

        /// <summary>
        /// The width (in pixels) of the tooltip.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public MapLayerDefaultsMarkerTooltipSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

        /// <summary>
        /// The position relative to the target element, at which the tooltip will be shown. Predefined values are "bottom", "top", "left", "right", "center".
        /// </summary>
        /// <param name="value">The value for Position</param>
        public MapLayerDefaultsMarkerTooltipSettingsBuilder Position(string value)
        {
            Container.Position = value;
            return this;
        }

        /// <summary>
        /// Specify the delay in milliseconds before the tooltip is shown. This option is ignored if showOn is set to "click" or "focus".
        /// </summary>
        /// <param name="value">The value for ShowAfter</param>
        public MapLayerDefaultsMarkerTooltipSettingsBuilder ShowAfter(double value)
        {
            Container.ShowAfter = value;
            return this;
        }

        /// <summary>
        /// The event on which the tooltip will be shown. Predefined values are "mouseenter", "click" and "focus".
        /// </summary>
        /// <param name="value">The value for ShowOn</param>
        public MapLayerDefaultsMarkerTooltipSettingsBuilder ShowOn(string value)
        {
            Container.ShowOn = value;
            return this;
        }

    }
}
