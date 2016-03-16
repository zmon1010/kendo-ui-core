using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<StockChartNavigatorSettingsCategoryAxisPlotBand<T>>
    /// </summary>
    public partial class StockChartNavigatorSettingsCategoryAxisPlotBandFactory<T>
        where T : class 
    {
        public StockChartNavigatorSettingsCategoryAxisPlotBandFactory(List<StockChartNavigatorSettingsCategoryAxisPlotBand<T>> container)
        {
            Container = container;
        }

        protected List<StockChartNavigatorSettingsCategoryAxisPlotBand<T>> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
