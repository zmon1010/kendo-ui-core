using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieLabelsSettings
    /// </summary>
    public partial class ChartSerieLabelsSettingsBuilder
        
    {
        public ChartSerieLabelsSettingsBuilder(ChartSerieLabelsSettings container)
        {
            Container = container;
        }

        protected ChartSerieLabelsSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
