using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartYAxisCrosshairSettings
    /// </summary>
    public partial class ChartYAxisCrosshairSettingsBuilder
        
    {
        public ChartYAxisCrosshairSettingsBuilder(ChartYAxisCrosshairSettings container)
        {
            Container = container;
        }

        protected ChartYAxisCrosshairSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
