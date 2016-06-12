using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapLayerTooltipContentSettings
    /// </summary>
    public partial class MapLayerTooltipContentSettingsBuilder
        
    {
        public MapLayerTooltipContentSettingsBuilder(MapLayerTooltipContentSettings container)
        {
            Container = container;
        }

        protected MapLayerTooltipContentSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
