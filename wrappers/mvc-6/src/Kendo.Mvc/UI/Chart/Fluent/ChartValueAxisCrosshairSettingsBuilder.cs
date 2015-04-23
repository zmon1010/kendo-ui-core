using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartValueAxisCrosshairSettings
    /// </summary>
    public partial class ChartValueAxisCrosshairSettingsBuilder
        
    {
        public ChartValueAxisCrosshairSettingsBuilder(ChartValueAxisCrosshairSettings container)
        {
            Container = container;
        }

        protected ChartValueAxisCrosshairSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
