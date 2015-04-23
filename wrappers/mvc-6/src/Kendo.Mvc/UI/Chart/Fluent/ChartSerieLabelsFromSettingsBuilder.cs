using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieLabelsFromSettings
    /// </summary>
    public partial class ChartSerieLabelsFromSettingsBuilder
        
    {
        public ChartSerieLabelsFromSettingsBuilder(ChartSerieLabelsFromSettings container)
        {
            Container = container;
        }

        protected ChartSerieLabelsFromSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
