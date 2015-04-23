using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieStackSettings
    /// </summary>
    public partial class ChartSerieStackSettingsBuilder
        
    {
        public ChartSerieStackSettingsBuilder(ChartSerieStackSettings container)
        {
            Container = container;
        }

        protected ChartSerieStackSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
