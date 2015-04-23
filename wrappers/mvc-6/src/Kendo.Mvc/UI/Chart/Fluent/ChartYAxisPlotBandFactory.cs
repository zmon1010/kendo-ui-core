using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<ChartYAxisPlotBand>
    /// </summary>
    public partial class ChartYAxisPlotBandFactory
        
    {
        public ChartYAxisPlotBandFactory(List<ChartYAxisPlotBand> container)
        {
            Container = container;
        }

        protected List<ChartYAxisPlotBand> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
