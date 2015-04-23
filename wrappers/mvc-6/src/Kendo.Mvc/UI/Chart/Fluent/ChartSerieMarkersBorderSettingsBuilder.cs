using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieMarkersBorderSettings
    /// </summary>
    public partial class ChartSerieMarkersBorderSettingsBuilder
        
    {
        public ChartSerieMarkersBorderSettingsBuilder(ChartSerieMarkersBorderSettings container)
        {
            Container = container;
        }

        protected ChartSerieMarkersBorderSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
