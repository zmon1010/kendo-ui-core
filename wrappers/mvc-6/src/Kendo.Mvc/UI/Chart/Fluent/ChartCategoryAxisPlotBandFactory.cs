using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<ChartCategoryAxisPlotBand>
    /// </summary>
    public partial class ChartCategoryAxisPlotBandFactory
        
    {
        public ChartCategoryAxisPlotBandFactory(List<ChartCategoryAxisPlotBand> container)
        {
            Container = container;
        }

        protected List<ChartCategoryAxisPlotBand> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
