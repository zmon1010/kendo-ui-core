using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartLegendMarginSettings
    /// </summary>
    public partial class ChartLegendMarginSettingsBuilder
        
    {
        public ChartLegendMarginSettingsBuilder(ChartLegendMarginSettings container)
        {
            Container = container;
        }

        protected ChartLegendMarginSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
