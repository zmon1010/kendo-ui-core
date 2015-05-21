using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesTargetBorderSettings
    /// </summary>
    public partial class ChartSeriesTargetBorderSettingsBuilder
        
    {
        /// <summary>
        /// The color of the border.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartSeriesTargetBorderSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The following dash types are supported:
        /// </summary>
        /// <param name="value">The value for DashType</param>
        public ChartSeriesTargetBorderSettingsBuilder DashType(ChartDashType value)
        {
            Container.DashType = value;
            return this;
        }

        /// <summary>
        /// The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartSeriesTargetBorderSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

    }
}
