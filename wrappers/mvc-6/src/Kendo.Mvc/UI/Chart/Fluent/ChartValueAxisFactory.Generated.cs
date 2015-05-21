using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for adding items to Kendo UI Chart
    /// </summary>
    public partial class ChartValueAxisFactory
        
    {

        public Chart Chart { get; set; }

        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual ChartValueAxisBuilder Add()
        {
            var item = new ChartValueAxis();
            item.Chart = Chart;
            Container.Add(item);

            return new ChartValueAxisBuilder(item);
        }
    }
}
