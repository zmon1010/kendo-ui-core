using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartPlotAreaBorderSettings
    /// </summary>
    public partial class ChartPlotAreaBorderSettingsBuilder
        
    {
        public ChartPlotAreaBorderSettingsBuilder(ChartPlotAreaBorderSettings container)
        {
            Container = container;
        }

        protected ChartPlotAreaBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
