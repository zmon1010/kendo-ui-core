using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartXAxisCrosshairSettings
    /// </summary>
    public partial class ChartXAxisCrosshairSettingsBuilder
        
    {
        /// <summary>
        /// The color of the crosshair. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartXAxisCrosshairSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The opacity of the crosshair. By default the crosshair is opaque.
        /// </summary>
        /// <param name="value">The value for Opacity</param>
        public ChartXAxisCrosshairSettingsBuilder Opacity(double value)
        {
            Container.Opacity = value;
            return this;
        }

        /// <summary>
        /// The crosshar tooltip options.
        /// </summary>
        /// <param name="configurator">The configurator for the tooltip setting.</param>
        public ChartXAxisCrosshairSettingsBuilder Tooltip(Action<ChartXAxisCrosshairTooltipSettingsBuilder> configurator)
        {

            Container.Tooltip.Chart = Container.Chart;
            configurator(new ChartXAxisCrosshairTooltipSettingsBuilder(Container.Tooltip));

            return this;
        }

        /// <summary>
        /// If set to true the chart will display the scatter chart x axis crosshair. By default the scatter chart x axis crosshair is not visible.
        /// </summary>
        /// <param name="value">The value for Visible</param>
        public ChartXAxisCrosshairSettingsBuilder Visible(bool value)
        {
            Container.Visible = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the scatter chart x axis crosshair. By default the scatter chart x axis crosshair is not visible.
        /// </summary>
        public ChartXAxisCrosshairSettingsBuilder Visible()
        {
            Container.Visible = true;
            return this;
        }

        /// <summary>
        /// The width of the crosshair in pixels.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartXAxisCrosshairSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

    }
}
