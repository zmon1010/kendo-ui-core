using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieErrorBarsSettings
    /// </summary>
    public partial class ChartSerieErrorBarsSettingsBuilder
        
    {
        public ChartSerieErrorBarsSettingsBuilder(ChartSerieErrorBarsSettings container)
        {
            Container = container;
        }

        protected ChartSerieErrorBarsSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
