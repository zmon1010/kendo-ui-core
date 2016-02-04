using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartZoomableSelectionSettings
    /// </summary>
    public partial class ChartZoomableSelectionSettingsBuilder
        
    {
        public ChartZoomableSelectionSettingsBuilder(ChartZoomableSelectionSettings container)
        {
            Container = container;
        }

        protected ChartZoomableSelectionSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
