using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapLayerTooltipSettings
    /// </summary>
    public partial class MapLayerTooltipSettingsBuilder
        
    {
        public MapLayerTooltipSettingsBuilder(MapLayerTooltipSettings container)
        {
            Container = container;
        }

        protected MapLayerTooltipSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
