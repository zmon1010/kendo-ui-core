using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartTooltipPaddingSettings
    /// </summary>
    public partial class ChartTooltipPaddingSettingsBuilder
        
    {
        public ChartTooltipPaddingSettingsBuilder(ChartTooltipPaddingSettings container)
        {
            Container = container;
        }

        protected ChartTooltipPaddingSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
