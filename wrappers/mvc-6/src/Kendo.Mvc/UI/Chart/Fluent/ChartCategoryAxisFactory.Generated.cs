using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for adding items to Kendo UI Chart
    /// </summary>
    public partial class ChartCategoryAxisFactory
        
    {

        public Chart Chart { get; set; }

        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual ChartCategoryAxisBuilder Add()
        {
            var item = new ChartCategoryAxis();
            item.Chart = Chart;
            Container.Add(item);

            return new ChartCategoryAxisBuilder(item);
        }
    }
}
