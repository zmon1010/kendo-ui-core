using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieConnectorsSettings
    /// </summary>
    public partial class ChartSerieConnectorsSettingsBuilder
        
    {
        public ChartSerieConnectorsSettingsBuilder(ChartSerieConnectorsSettings container)
        {
            Container = container;
        }

        protected ChartSerieConnectorsSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
