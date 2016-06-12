using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapMarkerDefaultsTooltipSettings
    /// </summary>
    public partial class MapMarkerDefaultsTooltipSettingsBuilder
        
    {
        public MapMarkerDefaultsTooltipSettingsBuilder(MapMarkerDefaultsTooltipSettings container)
        {
            Container = container;
        }

        protected MapMarkerDefaultsTooltipSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
