using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartYAxisCrosshairSettings
    /// </summary>
    public partial class ChartYAxisCrosshairSettingsBuilder
        
    {
        /// <summary>
        /// The color of the crosshair. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartYAxisCrosshairSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The opacity of the crosshair. By default the crosshair is opaque.
        /// </summary>
        /// <param name="value">The value for Opacity</param>
        public ChartYAxisCrosshairSettingsBuilder Opacity(double value)
        {
            Container.Opacity = value;
            return this;
        }

        /// <summary>
        /// The crosshar tooltip options.
        /// </summary>
        /// <param name="configurator">The configurator for the tooltip setting.</param>
        public ChartYAxisCrosshairSettingsBuilder Tooltip(Action<ChartYAxisCrosshairTooltipSettingsBuilder> configurator)
        {

            Container.Tooltip.Chart = Container.Chart;
            configurator(new ChartYAxisCrosshairTooltipSettingsBuilder(Container.Tooltip));

            return this;
        }

        /// <summary>
        /// If set to true the chart will display the scatter chart y axis crosshair. By default the scatter chart y axis crosshair is not visible.
        /// </summary>
        /// <param name="value">The value for Visible</param>
        public ChartYAxisCrosshairSettingsBuilder Visible(bool value)
        {
            Container.Visible = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the scatter chart y axis crosshair. By default the scatter chart y axis crosshair is not visible.
        /// </summary>
        public ChartYAxisCrosshairSettingsBuilder Visible()
        {
            Container.Visible = true;
            return this;
        }

        /// <summary>
        /// The width of the crosshair in pixels.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartYAxisCrosshairSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

    }
}
