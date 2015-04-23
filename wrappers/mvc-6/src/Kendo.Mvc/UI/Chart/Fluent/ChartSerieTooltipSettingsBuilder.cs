using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieTooltipSettings
    /// </summary>
    public partial class ChartSerieTooltipSettingsBuilder
        
    {
        public ChartSerieTooltipSettingsBuilder(ChartSerieTooltipSettings container)
        {
            Container = container;
        }

        protected ChartSerieTooltipSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
