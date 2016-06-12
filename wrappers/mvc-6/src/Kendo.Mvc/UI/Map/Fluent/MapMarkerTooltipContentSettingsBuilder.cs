using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapMarkerTooltipContentSettings
    /// </summary>
    public partial class MapMarkerTooltipContentSettingsBuilder
        
    {
        public MapMarkerTooltipContentSettingsBuilder(MapMarkerTooltipContentSettings container)
        {
            Container = container;
        }

        protected MapMarkerTooltipContentSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
