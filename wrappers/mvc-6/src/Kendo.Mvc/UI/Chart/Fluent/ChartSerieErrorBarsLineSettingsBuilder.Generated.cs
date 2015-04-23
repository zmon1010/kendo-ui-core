using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieErrorBarsLineSettings
    /// </summary>
    public partial class ChartSerieErrorBarsLineSettingsBuilder
        
    {
        /// <summary>
        /// The width of the line.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartSerieErrorBarsLineSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

        /// <summary>
        /// The dash type of the error bars line.The following dash types are supported:
        /// </summary>
        /// <param name="value">The value for DashType</param>
        public ChartSerieErrorBarsLineSettingsBuilder DashType(string value)
        {
            Container.DashType = value;
            return this;
        }

    }
}
