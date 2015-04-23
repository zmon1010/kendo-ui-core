using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesTooltipSettings
    /// </summary>
    public partial class ChartSeriesTooltipSettingsBuilder
        
    {
        public ChartSeriesTooltipSettingsBuilder(ChartSeriesTooltipSettings container)
        {
            Container = container;
        }

        protected ChartSeriesTooltipSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
