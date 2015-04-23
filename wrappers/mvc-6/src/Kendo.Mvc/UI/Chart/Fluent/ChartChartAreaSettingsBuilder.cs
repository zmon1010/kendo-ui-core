using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartChartAreaSettings
    /// </summary>
    public partial class ChartChartAreaSettingsBuilder
        
    {
        public ChartChartAreaSettingsBuilder(ChartChartAreaSettings container)
        {
            Container = container;
        }

        protected ChartChartAreaSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
