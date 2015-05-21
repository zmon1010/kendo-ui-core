using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesOverlaySettings
    /// </summary>
    public partial class ChartSeriesOverlaySettingsBuilder
        
    {
        public ChartSeriesOverlaySettingsBuilder(ChartSeriesOverlaySettings container)
        {
            Container = container;
        }

        protected ChartSeriesOverlaySettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
