using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesTargetBorderSettings
    /// </summary>
    public partial class ChartSeriesTargetBorderSettingsBuilder
        
    {
        public ChartSeriesTargetBorderSettingsBuilder(ChartSeriesTargetBorderSettings container)
        {
            Container = container;
        }

        protected ChartSeriesTargetBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
