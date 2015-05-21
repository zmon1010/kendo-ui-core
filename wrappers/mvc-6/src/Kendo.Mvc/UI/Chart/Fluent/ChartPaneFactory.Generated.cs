using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for adding items to Kendo UI Chart
    /// </summary>
    public partial class ChartPaneFactory
        
    {

        public Chart Chart { get; set; }

        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual ChartPaneBuilder Add()
        {
            var item = new ChartPane();
            item.Chart = Chart;
            Container.Add(item);

            return new ChartPaneBuilder(item);
        }
    }
}
