using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesErrorBarsSettings
    /// </summary>
    public partial class ChartSeriesErrorBarsSettingsBuilder
        
    {
        public ChartSeriesErrorBarsSettingsBuilder(ChartSeriesErrorBarsSettings container)
        {
            Container = container;
        }

        protected ChartSeriesErrorBarsSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
