using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for adding items to Kendo UI CategoryAxisItem
    /// </summary>
    public partial class StockChartNavigatorSettingsCategoryAxisPlotBandFactory<T>
        where T : class 
    {

        public StockChart<T> StockChart { get; set; }

        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual StockChartNavigatorSettingsCategoryAxisPlotBandBuilder<T> Add()
        {
            var item = new StockChartNavigatorSettingsCategoryAxisPlotBand<T>();
            item.StockChart = StockChart;
            Container.Add(item);

            return new StockChartNavigatorSettingsCategoryAxisPlotBandBuilder<T>(item);
        }
    }
}
