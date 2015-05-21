using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for adding items to Kendo UI XAxisItem
    /// </summary>
    public partial class ChartXAxisPlotBandFactory
        
    {

        public Chart Chart { get; set; }

        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual ChartXAxisPlotBandBuilder Add()
        {
            var item = new ChartXAxisPlotBand();
            item.Chart = Chart;
            Container.Add(item);

            return new ChartXAxisPlotBandBuilder(item);
        }
    }
}
