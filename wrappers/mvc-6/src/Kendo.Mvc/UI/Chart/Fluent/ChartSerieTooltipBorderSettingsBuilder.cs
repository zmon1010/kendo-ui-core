using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieTooltipBorderSettings
    /// </summary>
    public partial class ChartSerieTooltipBorderSettingsBuilder
        
    {
        public ChartSerieTooltipBorderSettingsBuilder(ChartSerieTooltipBorderSettings container)
        {
            Container = container;
        }

        protected ChartSerieTooltipBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
