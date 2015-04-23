using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartLegendLabelsSettings
    /// </summary>
    public partial class ChartLegendLabelsSettingsBuilder
        
    {
        public ChartLegendLabelsSettingsBuilder(ChartLegendLabelsSettings container)
        {
            Container = container;
        }

        protected ChartLegendLabelsSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
