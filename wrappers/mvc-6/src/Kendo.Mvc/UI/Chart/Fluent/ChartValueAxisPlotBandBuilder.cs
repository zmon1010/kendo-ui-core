using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartValueAxisPlotBand
    /// </summary>
    public partial class ChartValueAxisPlotBandBuilder
        
    {
        public ChartValueAxisPlotBandBuilder(ChartValueAxisPlotBand container)
        {
            Container = container;
        }

        protected ChartValueAxisPlotBand Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
