using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartTooltipBorderSettings
    /// </summary>
    public partial class ChartTooltipBorderSettingsBuilder
        
    {
        public ChartTooltipBorderSettingsBuilder(ChartTooltipBorderSettings container)
        {
            Container = container;
        }

        protected ChartTooltipBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
