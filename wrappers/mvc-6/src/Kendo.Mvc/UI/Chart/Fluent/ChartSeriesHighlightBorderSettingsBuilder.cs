using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesHighlightBorderSettings
    /// </summary>
    public partial class ChartSeriesHighlightBorderSettingsBuilder
        
    {
        public ChartSeriesHighlightBorderSettingsBuilder(ChartSeriesHighlightBorderSettings container)
        {
            Container = container;
        }

        protected ChartSeriesHighlightBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
