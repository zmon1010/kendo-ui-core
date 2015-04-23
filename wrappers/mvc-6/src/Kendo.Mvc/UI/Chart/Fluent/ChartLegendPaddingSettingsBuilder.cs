using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartLegendPaddingSettings
    /// </summary>
    public partial class ChartLegendPaddingSettingsBuilder
        
    {
        public ChartLegendPaddingSettingsBuilder(ChartLegendPaddingSettings container)
        {
            Container = container;
        }

        protected ChartLegendPaddingSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
