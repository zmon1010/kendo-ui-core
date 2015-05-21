using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesTargetLineSettings
    /// </summary>
    public partial class ChartSeriesTargetLineSettingsBuilder
        
    {
        public ChartSeriesTargetLineSettingsBuilder(ChartSeriesTargetLineSettings container)
        {
            Container = container;
        }

        protected ChartSeriesTargetLineSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
