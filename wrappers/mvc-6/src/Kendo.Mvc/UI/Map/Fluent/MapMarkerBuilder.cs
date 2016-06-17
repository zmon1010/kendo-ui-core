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

        /// <summary>
        /// The tooltip options for this marker.
        /// </summary>
        /// <param name="configurator">The action that configures the tooltip.</param>
        public MapMarkerBuilder Tooltip(Action<MapMarkerTooltipBuilder> configurator)
        {
            configurator(new MapMarkerTooltipBuilder(Container.Tooltip));
            return this;
        }
    }
}
