using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieLineSettings
    /// </summary>
    public partial class ChartSerieLineSettingsBuilder
        
    {
        public ChartSerieLineSettingsBuilder(ChartSerieLineSettings container)
        {
            Container = container;
        }

        protected ChartSerieLineSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
