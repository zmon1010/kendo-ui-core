using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapLayer
    /// </summary>
    public partial class MapLayerBuilder
        
    {
        public MapLayerBuilder(MapLayer container)
        {
            Container = container;
        }

        protected MapLayer Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
