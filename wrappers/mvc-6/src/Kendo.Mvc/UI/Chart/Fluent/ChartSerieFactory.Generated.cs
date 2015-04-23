using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for adding items to Kendo UI Chart
    /// </summary>
    public partial class ChartSerieFactory
        
    {

        public Chart Chart { get; set; }

        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual ChartSerieBuilder Add()
        {
            var item = new ChartSerie();
            item.Chart = Chart;
            Container.Add(item);

            return new ChartSerieBuilder(item);
        }
    }
}
