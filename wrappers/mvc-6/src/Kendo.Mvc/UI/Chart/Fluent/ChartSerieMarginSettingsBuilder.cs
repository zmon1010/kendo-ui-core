using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieMarginSettings
    /// </summary>
    public partial class ChartSerieMarginSettingsBuilder
        
    {
        public ChartSerieMarginSettingsBuilder(ChartSerieMarginSettings container)
        {
            Container = container;
        }

        protected ChartSerieMarginSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
