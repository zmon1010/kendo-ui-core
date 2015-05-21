using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartPlotAreaPaddingSettings
    /// </summary>
    public partial class ChartPlotAreaPaddingSettingsBuilder
        
    {
        public ChartPlotAreaPaddingSettingsBuilder(ChartPlotAreaPaddingSettings container)
        {
            Container = container;
        }

        protected ChartPlotAreaPaddingSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
