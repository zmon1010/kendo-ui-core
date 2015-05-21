using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartLegendBorderSettings
    /// </summary>
    public partial class ChartLegendBorderSettingsBuilder
        
    {
        public ChartLegendBorderSettingsBuilder(ChartLegendBorderSettings container)
        {
            Container = container;
        }

        protected ChartLegendBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
