using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartLegendSettings
    /// </summary>
    public partial class ChartLegendSettingsBuilder
        
    {
        public ChartLegendSettingsBuilder(ChartLegendSettings container)
        {
            Container = container;
        }

        protected ChartLegendSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
