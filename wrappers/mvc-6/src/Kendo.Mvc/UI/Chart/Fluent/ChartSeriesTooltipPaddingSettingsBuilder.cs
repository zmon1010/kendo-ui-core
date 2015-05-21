using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesTooltipPaddingSettings
    /// </summary>
    public partial class ChartSeriesTooltipPaddingSettingsBuilder
        
    {
        public ChartSeriesTooltipPaddingSettingsBuilder(ChartSeriesTooltipPaddingSettings container)
        {
            Container = container;
        }

        protected ChartSeriesTooltipPaddingSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
