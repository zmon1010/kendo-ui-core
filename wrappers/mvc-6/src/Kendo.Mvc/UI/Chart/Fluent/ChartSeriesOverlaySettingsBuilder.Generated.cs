using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesOverlaySettings
    /// </summary>
    public partial class ChartSeriesOverlaySettingsBuilder
        
    {
        /// <summary>
        /// The chart series gradient.The supported values are:
        /// </summary>
        /// <param name="value">The value for Gradient</param>
        public ChartSeriesOverlaySettingsBuilder Gradient(string value)
        {
            Container.Gradient = value;
            return this;
        }

    }
}
