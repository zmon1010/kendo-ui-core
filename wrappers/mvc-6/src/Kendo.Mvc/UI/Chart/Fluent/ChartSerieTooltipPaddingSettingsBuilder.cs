using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieTooltipPaddingSettings
    /// </summary>
    public partial class ChartSerieTooltipPaddingSettingsBuilder
        
    {
        public ChartSerieTooltipPaddingSettingsBuilder(ChartSerieTooltipPaddingSettings container)
        {
            Container = container;
        }

        protected ChartSerieTooltipPaddingSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
