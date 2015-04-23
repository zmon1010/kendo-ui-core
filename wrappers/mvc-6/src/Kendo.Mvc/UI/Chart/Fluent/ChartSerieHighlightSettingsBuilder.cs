using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieHighlightSettings
    /// </summary>
    public partial class ChartSerieHighlightSettingsBuilder
        
    {
        public ChartSerieHighlightSettingsBuilder(ChartSerieHighlightSettings container)
        {
            Container = container;
        }

        protected ChartSerieHighlightSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
