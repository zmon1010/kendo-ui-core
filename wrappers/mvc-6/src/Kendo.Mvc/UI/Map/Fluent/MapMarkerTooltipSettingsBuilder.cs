using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapMarkerTooltipSettings
    /// </summary>
    public partial class MapMarkerTooltipSettingsBuilder
        
    {
        public MapMarkerTooltipSettingsBuilder(MapMarkerTooltipSettings container)
        {
            Container = container;
        }

        protected MapMarkerTooltipSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
