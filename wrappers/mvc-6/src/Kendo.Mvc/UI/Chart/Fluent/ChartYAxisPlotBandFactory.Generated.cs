using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for adding items to Kendo UI YAxisItem
    /// </summary>
    public partial class ChartYAxisPlotBandFactory
        
    {

        public Chart Chart { get; set; }

        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual ChartYAxisPlotBandBuilder Add()
        {
            var item = new ChartYAxisPlotBand();
            item.Chart = Chart;
            Container.Add(item);

            return new ChartYAxisPlotBandBuilder(item);
        }
    }
}
