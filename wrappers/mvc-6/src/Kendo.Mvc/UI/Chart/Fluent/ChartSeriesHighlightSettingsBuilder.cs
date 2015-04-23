using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesHighlightSettings
    /// </summary>
    public partial class ChartSeriesHighlightSettingsBuilder
        
    {
        public ChartSeriesHighlightSettingsBuilder(ChartSeriesHighlightSettings container)
        {
            Container = container;
        }

        protected ChartSeriesHighlightSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
