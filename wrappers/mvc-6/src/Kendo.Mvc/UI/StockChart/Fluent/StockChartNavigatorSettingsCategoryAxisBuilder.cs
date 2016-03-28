using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring StockChartNavigatorSettingsCategoryAxis
    /// </summary>
    public partial class StockChartNavigatorSettingsCategoryAxisBuilder<T>
        where T : class 
    {
        public StockChartNavigatorSettingsCategoryAxisBuilder(StockChartNavigatorSettingsCategoryAxis<T> container)
        {
            Container = container;
        }

        protected StockChartNavigatorSettingsCategoryAxis<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
