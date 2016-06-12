using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapMarkerDefaultsSettings
    /// </summary>
    public partial class MapMarkerDefaultsSettingsBuilder
        
    {
        public MapMarkerDefaultsSettingsBuilder(MapMarkerDefaultsSettings container)
        {
            Container = container;
        }

        protected MapMarkerDefaultsSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
