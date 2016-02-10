using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesOverlaySettings
    /// </summary>
    public partial class ChartSeriesOverlaySettingsBuilder<T>
        where T : class 
    {
        public ChartSeriesOverlaySettingsBuilder(ChartSeriesOverlaySettings<T> container)
        {
            Container = container;
        }

        protected ChartSeriesOverlaySettings<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
