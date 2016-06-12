using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapMarkerTooltipAnimationSettings
    /// </summary>
    public partial class MapMarkerTooltipAnimationSettingsBuilder
        
    {
        public MapMarkerTooltipAnimationSettingsBuilder(MapMarkerTooltipAnimationSettings container)
        {
            Container = container;
        }

        protected MapMarkerTooltipAnimationSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
