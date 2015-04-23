using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesHighlightLineSettings
    /// </summary>
    public partial class ChartSeriesHighlightLineSettingsBuilder
        
    {
        public ChartSeriesHighlightLineSettingsBuilder(ChartSeriesHighlightLineSettings container)
        {
            Container = container;
        }

        protected ChartSeriesHighlightLineSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
