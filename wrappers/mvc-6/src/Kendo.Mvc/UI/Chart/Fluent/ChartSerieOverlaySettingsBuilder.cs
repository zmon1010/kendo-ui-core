using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieOverlaySettings
    /// </summary>
    public partial class ChartSerieOverlaySettingsBuilder
        
    {
        public ChartSerieOverlaySettingsBuilder(ChartSerieOverlaySettings container)
        {
            Container = container;
        }

        protected ChartSerieOverlaySettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
