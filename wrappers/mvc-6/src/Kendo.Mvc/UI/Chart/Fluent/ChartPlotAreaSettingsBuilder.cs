using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartPlotAreaSettings
    /// </summary>
    public partial class ChartPlotAreaSettingsBuilder
        
    {
        public ChartPlotAreaSettingsBuilder(ChartPlotAreaSettings container)
        {
            Container = container;
        }

        protected ChartPlotAreaSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
