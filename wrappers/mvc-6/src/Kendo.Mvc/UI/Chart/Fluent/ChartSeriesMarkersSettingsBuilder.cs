using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesMarkersSettings
    /// </summary>
    public partial class ChartSeriesMarkersSettingsBuilder
        
    {
        public ChartSeriesMarkersSettingsBuilder(ChartSeriesMarkersSettings container)
        {
            Container = container;
        }

        protected ChartSeriesMarkersSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
