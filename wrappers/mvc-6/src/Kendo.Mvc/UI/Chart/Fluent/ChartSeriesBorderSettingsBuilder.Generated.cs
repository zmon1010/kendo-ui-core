using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesBorderSettings
    /// </summary>
    public partial class ChartSeriesBorderSettingsBuilder
        
    {
        /// <summary>
        /// The color of the border. Accepts a valid CSS color string, including hex and rgb. By default it is set to color of the current series.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartSeriesBorderSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The dash type of the border.The following dash types are supported:
        /// </summary>
        /// <param name="value">The value for DashType</param>
        public ChartSeriesBorderSettingsBuilder DashType(ChartDashType value)
        {
            Container.DashType = value;
            return this;
        }

        /// <summary>
        /// The opacity of the border. By default the border is opaque.
        /// </summary>
        /// <param name="value">The value for Opacity</param>
        public ChartSeriesBorderSettingsBuilder Opacity(double value)
        {
            Container.Opacity = value;
            return this;
        }

        /// <summary>
        /// The width of the border in pixels.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartSeriesBorderSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

    }
}
