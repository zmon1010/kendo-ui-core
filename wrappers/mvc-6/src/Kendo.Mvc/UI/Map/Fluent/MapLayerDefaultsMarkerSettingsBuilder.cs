using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapLayerDefaultsMarkerSettings
    /// </summary>
    public partial class MapLayerDefaultsMarkerSettingsBuilder
        
    {
        public MapLayerDefaultsMarkerSettingsBuilder(MapLayerDefaultsMarkerSettings container)
        {
            Container = container;
        }

        protected MapLayerDefaultsMarkerSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
