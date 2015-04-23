using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieTargetLineSettings
    /// </summary>
    public partial class ChartSerieTargetLineSettingsBuilder
        
    {
        /// <summary>
        /// The width of the line.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartSerieTargetLineSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

    }
}
