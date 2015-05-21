using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for adding items to Kendo UI Chart
    /// </summary>
    public partial class ChartXAxisFactory
        
    {

        public Chart Chart { get; set; }

        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual ChartXAxisBuilder Add()
        {
            var item = new ChartXAxis();
            item.Chart = Chart;
            Container.Add(item);

            return new ChartXAxisBuilder(item);
        }
    }
}
