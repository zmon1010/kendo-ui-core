using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeries
    /// </summary>
    public partial class ChartSeriesBuilder<T>
        where T : class 
    {
        public ChartSeriesBuilder(ChartSeries<T> container)
        {
            Container = container;
        }

        protected ChartSeries<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
