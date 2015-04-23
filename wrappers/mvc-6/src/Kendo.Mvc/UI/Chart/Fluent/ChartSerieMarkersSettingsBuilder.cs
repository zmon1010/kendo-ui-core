using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieMarkersSettings
    /// </summary>
    public partial class ChartSerieMarkersSettingsBuilder
        
    {
        public ChartSerieMarkersSettingsBuilder(ChartSerieMarkersSettings container)
        {
            Container = container;
        }

        protected ChartSerieMarkersSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
