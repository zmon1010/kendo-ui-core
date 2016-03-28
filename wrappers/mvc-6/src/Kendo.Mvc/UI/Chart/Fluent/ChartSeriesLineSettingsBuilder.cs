using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesLineSettings
    /// </summary>
    public partial class ChartSeriesLineSettingsBuilder<T>
        where T : class 
    {
        public ChartSeriesLineSettingsBuilder(ChartSeriesLineSettings<T> container)
        {
            Container = container;
        }

        protected ChartSeriesLineSettings<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
