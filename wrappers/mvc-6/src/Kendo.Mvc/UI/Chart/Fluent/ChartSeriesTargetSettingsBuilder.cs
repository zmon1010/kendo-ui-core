using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesTargetSettings
    /// </summary>
    public partial class ChartSeriesTargetSettingsBuilder
        
    {
        public ChartSeriesTargetSettingsBuilder(ChartSeriesTargetSettings container)
        {
            Container = container;
        }

        protected ChartSeriesTargetSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
