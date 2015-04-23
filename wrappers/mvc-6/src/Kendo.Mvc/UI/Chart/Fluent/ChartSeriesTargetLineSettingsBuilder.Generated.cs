using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesTargetLineSettings
    /// </summary>
    public partial class ChartSeriesTargetLineSettingsBuilder
        
    {
        /// <summary>
        /// The width of the line.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartSeriesTargetLineSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

    }
}
