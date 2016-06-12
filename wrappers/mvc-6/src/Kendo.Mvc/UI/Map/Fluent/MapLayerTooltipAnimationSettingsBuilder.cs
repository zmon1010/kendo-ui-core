using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapLayerTooltipAnimationSettings
    /// </summary>
    public partial class MapLayerTooltipAnimationSettingsBuilder
        
    {
        public MapLayerTooltipAnimationSettingsBuilder(MapLayerTooltipAnimationSettings container)
        {
            Container = container;
        }

        protected MapLayerTooltipAnimationSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
