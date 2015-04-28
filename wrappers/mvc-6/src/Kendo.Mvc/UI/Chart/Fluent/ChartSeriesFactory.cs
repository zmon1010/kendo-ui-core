using System;
using System.Collections;
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

        /// <summary>
        /// Adds an area series
        /// </summary>
        public virtual ChartSeriesBuilder Area(IEnumerable data)
        {
            var item = new ChartSeries()
            {
                Type = "area",
                Data = data
            };

            item.Chart = Chart;
            Container.Add(item);

            return new ChartSeriesBuilder(item);
        }
    }
}
