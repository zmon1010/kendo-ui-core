using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieHighlightBorderSettings
    /// </summary>
    public partial class ChartSerieHighlightBorderSettingsBuilder
        
    {
        public ChartSerieHighlightBorderSettingsBuilder(ChartSerieHighlightBorderSettings container)
        {
            Container = container;
        }

        protected ChartSerieHighlightBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
