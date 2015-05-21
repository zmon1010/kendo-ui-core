using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesLabelsSettings
    /// </summary>
    public partial class ChartSeriesLabelsSettingsBuilder
        
    {
        public ChartSeriesLabelsSettingsBuilder(ChartSeriesLabelsSettings container)
        {
            Container = container;
        }

        protected ChartSeriesLabelsSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
