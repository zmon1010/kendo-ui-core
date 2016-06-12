using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapMarker
    /// </summary>
    public partial class MapMarkerBuilder
        
    {
        public MapMarkerBuilder(MapMarker container)
        {
            Container = container;
        }

        protected MapMarker Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
