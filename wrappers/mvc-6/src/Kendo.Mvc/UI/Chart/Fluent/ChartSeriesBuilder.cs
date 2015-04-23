using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeries
    /// </summary>
    public partial class ChartSeriesBuilder
        
    {
        public ChartSeriesBuilder(ChartSeries container)
        {
            Container = container;
        }

        protected ChartSeries Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
