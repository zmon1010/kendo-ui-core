using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartLegendItemSettings
    /// </summary>
    public partial class ChartLegendItemSettingsBuilder
        
    {
        public ChartLegendItemSettingsBuilder(ChartLegendItemSettings container)
        {
            Container = container;
        }

        protected ChartLegendItemSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
