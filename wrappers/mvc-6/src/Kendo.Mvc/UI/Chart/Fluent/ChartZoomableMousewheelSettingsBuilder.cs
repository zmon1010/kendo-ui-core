using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartZoomableMousewheelSettings
    /// </summary>
    public partial class ChartZoomableMousewheelSettingsBuilder
        
    {
        public ChartZoomableMousewheelSettingsBuilder(ChartZoomableMousewheelSettings container)
        {
            Container = container;
        }

        protected ChartZoomableMousewheelSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
