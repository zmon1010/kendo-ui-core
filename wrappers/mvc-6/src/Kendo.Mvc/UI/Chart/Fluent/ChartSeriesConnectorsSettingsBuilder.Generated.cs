using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesConnectorsSettings
    /// </summary>
    public partial class ChartSeriesConnectorsSettingsBuilder
        
    {
        /// <summary>
        /// The color of the connector. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartSeriesConnectorsSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The padding between the connector line and the label, and connector line and donut chart.
        /// </summary>
        /// <param name="value">The value for Padding</param>
        public ChartSeriesConnectorsSettingsBuilder Padding(double value)
        {
            Container.Padding = value;
            return this;
        }

        /// <summary>
        /// The width of the connector line.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartSeriesConnectorsSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

    }
}
