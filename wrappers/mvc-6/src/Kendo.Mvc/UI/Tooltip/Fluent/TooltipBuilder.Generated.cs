using System;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI Tooltip
    /// </summary>
    public partial class TooltipBuilder
        
    {
        /// <summary>
        /// Specifies if the Tooltip will be hidden when mouse leaves the target element. If set to false a close button will be shown within Tooltip. If set to false, showAfter is specified and the showOn is set to "mouseenter" the Tooltip will be displayed after the given timeout even if the element is no longer hovered.
        /// </summary>
        /// <param name="value">The value for AutoHide</param>
        public TooltipBuilder AutoHide(bool value)
        {
            Container.AutoHide = value;
            return this;
        }

        /// <summary>
        /// Specifies if the Tooltip callout will be displayed.
        /// </summary>
        /// <param name="value">The value for Callout</param>
        public TooltipBuilder Callout(bool value)
        {
            Container.Callout = value;
            return this;
        }

        /// <summary>
        /// Specifies a selector for elements, within the container, for which the Tooltip will be displayed.
        /// </summary>
        /// <param name="value">The value for Filter</param>
        public TooltipBuilder Filter(string value)
        {
            Container.Filter = value;
            return this;
        }

        /// <summary>
        /// Explicitly states whether content iframe should be created.
        /// </summary>
        /// <param name="value">The value for Iframe</param>
        public TooltipBuilder Iframe(bool value)
        {
            Container.Iframe = value;
            return this;
        }

        /// <summary>
        /// The height (in pixels) of the Tooltip.
        /// </summary>
        /// <param name="value">The value for Height</param>
        public TooltipBuilder Height(double value)
        {
            Container.Height = value;
            return this;
        }

        /// <summary>
        /// The width (in pixels) of the Tooltip.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public TooltipBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

        /// <summary>
        /// Specify the delay in milliseconds before the Tooltip is shown. This option is ignored if showOn is set to "click" or "focus".
        /// </summary>
        /// <param name="value">The value for ShowAfter</param>
        public TooltipBuilder ShowAfter(double value)
        {
            Container.ShowAfter = value;
            return this;
        }

        /// <summary>
        /// Represents the tooltip position.
        /// </summary>
        /// <param name="value">The value for Position</param>
        public TooltipBuilder Position(TooltipPosition value)
        {
            Container.Position = value;
            return this;
        }

        /// <summary>
        /// Represents the tooltip position.
        /// </summary>
        /// <param name="value">The value for ShowOn</param>
        public TooltipBuilder ShowOn(TooltipShowOnEvent value)
        {
            Container.ShowOn = value;
            return this;
        }


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Tooltip()
        ///       .Name("Tooltip")
        ///       .Events(events => events
        ///           .ContentLoad("onContentLoad")
        ///       )
        /// )
        /// </code>
        /// </example>
        public TooltipBuilder Events(Action<TooltipEventBuilder> configurator)
        {
            configurator(new TooltipEventBuilder(Container.Events));
            return this;
        }
        
    }
}

