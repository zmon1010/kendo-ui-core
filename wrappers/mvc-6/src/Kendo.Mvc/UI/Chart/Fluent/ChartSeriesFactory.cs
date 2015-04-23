using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<ChartSeries>
    /// </summary>
    public partial class ChartSeriesFactory
        
    {
        public ChartSeriesFactory(List<ChartSeries> container)
        {
            Container = container;
        }

        protected List<ChartSeries> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
