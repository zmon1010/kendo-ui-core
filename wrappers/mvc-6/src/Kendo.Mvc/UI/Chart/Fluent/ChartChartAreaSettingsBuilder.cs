using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartChartAreaSettings
    /// </summary>
    public partial class ChartChartAreaSettingsBuilder<T>
        where T : class 
    {
        public ChartChartAreaSettingsBuilder(ChartChartAreaSettings<T> container)
        {
            Container = container;
        }

        protected ChartChartAreaSettings<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
