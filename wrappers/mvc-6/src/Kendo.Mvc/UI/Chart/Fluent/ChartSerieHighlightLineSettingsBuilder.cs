using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieHighlightLineSettings
    /// </summary>
    public partial class ChartSerieHighlightLineSettingsBuilder
        
    {
        public ChartSerieHighlightLineSettingsBuilder(ChartSerieHighlightLineSettings container)
        {
            Container = container;
        }

        protected ChartSerieHighlightLineSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
