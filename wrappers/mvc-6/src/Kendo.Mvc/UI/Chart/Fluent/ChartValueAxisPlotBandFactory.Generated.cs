using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for adding items to Kendo UI ValueAxisItem
    /// </summary>
    public partial class ChartValueAxisPlotBandFactory
        
    {

        public Chart Chart { get; set; }

        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual ChartValueAxisPlotBandBuilder Add()
        {
            var item = new ChartValueAxisPlotBand();
            item.Chart = Chart;
            Container.Add(item);

            return new ChartValueAxisPlotBandBuilder(item);
        }
    }
}
