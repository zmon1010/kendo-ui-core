using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesConnectorsSettings
    /// </summary>
    public partial class ChartSeriesConnectorsSettingsBuilder
        
    {
        public ChartSeriesConnectorsSettingsBuilder(ChartSeriesConnectorsSettings container)
        {
            Container = container;
        }

        protected ChartSeriesConnectorsSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
