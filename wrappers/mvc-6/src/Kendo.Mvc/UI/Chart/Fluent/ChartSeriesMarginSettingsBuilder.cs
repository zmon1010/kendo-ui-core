using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesMarginSettings
    /// </summary>
    public partial class ChartSeriesMarginSettingsBuilder
        
    {
        public ChartSeriesMarginSettingsBuilder(ChartSeriesMarginSettings container)
        {
            Container = container;
        }

        protected ChartSeriesMarginSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
