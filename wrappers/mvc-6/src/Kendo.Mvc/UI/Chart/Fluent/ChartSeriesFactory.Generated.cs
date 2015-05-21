using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for adding items to Kendo UI Chart
    /// </summary>
    public partial class ChartSeriesFactory
        
    {

        public Chart Chart { get; set; }

        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual ChartSeriesBuilder Add()
        {
            var item = new ChartSeries();
            item.Chart = Chart;
            Container.Add(item);

            return new ChartSeriesBuilder(item);
        }
    }
}
