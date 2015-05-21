using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<ChartXAxisPlotBand>
    /// </summary>
    public partial class ChartXAxisPlotBandFactory
        
    {
        public ChartXAxisPlotBandFactory(List<ChartXAxisPlotBand> container)
        {
            Container = container;
        }

        protected List<ChartXAxisPlotBand> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
