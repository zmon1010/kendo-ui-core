using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieLabelsToSettings
    /// </summary>
    public partial class ChartSerieLabelsToSettingsBuilder
        
    {
        public ChartSerieLabelsToSettingsBuilder(ChartSerieLabelsToSettings container)
        {
            Container = container;
        }

        protected ChartSerieLabelsToSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
