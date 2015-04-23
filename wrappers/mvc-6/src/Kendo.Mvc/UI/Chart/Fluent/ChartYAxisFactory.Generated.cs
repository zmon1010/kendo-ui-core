using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for adding items to Kendo UI Chart
    /// </summary>
    public partial class ChartYAxisFactory
        
    {

        public Chart Chart { get; set; }

        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual ChartYAxisBuilder Add()
        {
            var item = new ChartYAxis();
            item.Chart = Chart;
            Container.Add(item);

            return new ChartYAxisBuilder(item);
        }
    }
}
