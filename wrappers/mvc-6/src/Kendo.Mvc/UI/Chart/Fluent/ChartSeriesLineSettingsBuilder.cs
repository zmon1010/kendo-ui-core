using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesLineSettings
    /// </summary>
    public partial class ChartSeriesLineSettingsBuilder
        
    {
        public ChartSeriesLineSettingsBuilder(ChartSeriesLineSettings container)
        {
            Container = container;
        }

        protected ChartSeriesLineSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
