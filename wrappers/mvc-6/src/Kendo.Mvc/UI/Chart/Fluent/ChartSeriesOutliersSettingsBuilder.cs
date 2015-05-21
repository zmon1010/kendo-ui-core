using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesOutliersSettings
    /// </summary>
    public partial class ChartSeriesOutliersSettingsBuilder
        
    {
        public ChartSeriesOutliersSettingsBuilder(ChartSeriesOutliersSettings container)
        {
            Container = container;
        }

        protected ChartSeriesOutliersSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
