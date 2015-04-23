using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartValueAxisCrosshairTooltipSettings
    /// </summary>
    public partial class ChartValueAxisCrosshairTooltipSettingsBuilder
        
    {
        public ChartValueAxisCrosshairTooltipSettingsBuilder(ChartValueAxisCrosshairTooltipSettings container)
        {
            Container = container;
        }

        protected ChartValueAxisCrosshairTooltipSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
