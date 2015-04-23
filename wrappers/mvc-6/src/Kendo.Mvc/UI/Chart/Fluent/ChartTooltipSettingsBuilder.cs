using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartTooltipSettings
    /// </summary>
    public partial class ChartTooltipSettingsBuilder
        
    {
        public ChartTooltipSettingsBuilder(ChartTooltipSettings container)
        {
            Container = container;
        }

        protected ChartTooltipSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
