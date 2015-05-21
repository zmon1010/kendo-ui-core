using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartPlotAreaMarginSettings
    /// </summary>
    public partial class ChartPlotAreaMarginSettingsBuilder
        
    {
        public ChartPlotAreaMarginSettingsBuilder(ChartPlotAreaMarginSettings container)
        {
            Container = container;
        }

        protected ChartPlotAreaMarginSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
