using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartZoomableSettings
    /// </summary>
    public partial class ChartZoomableSettingsBuilder
        
    {
        public ChartZoomableSettingsBuilder(ChartZoomableSettings container)
        {
            Container = container;
        }

        protected ChartZoomableSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
