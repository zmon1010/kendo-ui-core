using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<ChartValueAxisPlotBand>
    /// </summary>
    public partial class ChartValueAxisPlotBandFactory
        
    {
        public ChartValueAxisPlotBandFactory(List<ChartValueAxisPlotBand> container)
        {
            Container = container;
        }

        protected List<ChartValueAxisPlotBand> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
