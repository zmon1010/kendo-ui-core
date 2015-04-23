using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesMarkersBorderSettings
    /// </summary>
    public partial class ChartSeriesMarkersBorderSettingsBuilder
        
    {
        public ChartSeriesMarkersBorderSettingsBuilder(ChartSeriesMarkersBorderSettings container)
        {
            Container = container;
        }

        protected ChartSeriesMarkersBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
