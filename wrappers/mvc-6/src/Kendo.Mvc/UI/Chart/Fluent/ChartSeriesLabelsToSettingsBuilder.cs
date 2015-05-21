using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesLabelsToSettings
    /// </summary>
    public partial class ChartSeriesLabelsToSettingsBuilder
        
    {
        public ChartSeriesLabelsToSettingsBuilder(ChartSeriesLabelsToSettings container)
        {
            Container = container;
        }

        protected ChartSeriesLabelsToSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
