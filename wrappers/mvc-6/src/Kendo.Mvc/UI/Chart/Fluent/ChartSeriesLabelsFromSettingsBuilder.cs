using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesLabelsFromSettings
    /// </summary>
    public partial class ChartSeriesLabelsFromSettingsBuilder
        
    {
        public ChartSeriesLabelsFromSettingsBuilder(ChartSeriesLabelsFromSettings container)
        {
            Container = container;
        }

        protected ChartSeriesLabelsFromSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
