using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for adding items to Kendo UI CategoryAxisItem
    /// </summary>
    public partial class ChartCategoryAxisPlotBandFactory
        
    {

        public Chart Chart { get; set; }

        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual ChartCategoryAxisPlotBandBuilder Add()
        {
            var item = new ChartCategoryAxisPlotBand();
            item.Chart = Chart;
            Container.Add(item);

            return new ChartCategoryAxisPlotBandBuilder(item);
        }
    }
}
