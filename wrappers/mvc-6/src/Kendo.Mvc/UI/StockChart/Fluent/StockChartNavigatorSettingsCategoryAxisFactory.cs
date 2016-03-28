using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<StockChartNavigatorSettingsCategoryAxis<T>>
    /// </summary>
    public partial class StockChartNavigatorSettingsCategoryAxisFactory<T>
        where T : class 
    {
        public StockChartNavigatorSettingsCategoryAxisFactory(List<StockChartNavigatorSettingsCategoryAxis<T>> container)
        {
            Container = container;
        }

        protected List<StockChartNavigatorSettingsCategoryAxis<T>> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
