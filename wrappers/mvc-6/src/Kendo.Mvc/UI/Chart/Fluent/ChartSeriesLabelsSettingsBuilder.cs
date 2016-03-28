using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesLabelsSettings
    /// </summary>
    public partial class ChartSeriesLabelsSettingsBuilder<T>
        where T : class 
    {
        public ChartSeriesLabelsSettingsBuilder(ChartSeriesLabelsSettings<T> container)
        {
            Container = container;
        }

        protected ChartSeriesLabelsSettings<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
