using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesTooltipBorderSettings
    /// </summary>
    public partial class ChartSeriesTooltipBorderSettingsBuilder
        
    {
        public ChartSeriesTooltipBorderSettingsBuilder(ChartSeriesTooltipBorderSettings container)
        {
            Container = container;
        }

        protected ChartSeriesTooltipBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
