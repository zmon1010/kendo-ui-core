using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for adding items to Kendo UI Chart
    /// </summary>
    public partial class ChartSeriesFactory<T>
        where T : class 
    {

        public Chart<T> Chart { get; set; }

        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual ChartSeriesBuilder<T> Add()
        {
            var item = new ChartSeries<T>();
            item.Chart = Chart;
            Container.Add(item);

            return new ChartSeriesBuilder<T>(item);
        }
    }
}
