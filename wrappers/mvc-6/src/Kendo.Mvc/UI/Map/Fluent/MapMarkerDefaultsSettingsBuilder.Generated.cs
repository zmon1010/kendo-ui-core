using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapMarkerDefaultsSettings
    /// </summary>
    public partial class MapMarkerDefaultsSettingsBuilder
        
    {
        /// <summary>
        /// Default Kendo UI Tooltip options for this marker.
        /// </summary>
        /// <param name="configurator">The configurator for the tooltip setting.</param>
        public MapMarkerDefaultsSettingsBuilder Tooltip(Action<MapMarkerDefaultsTooltipSettingsBuilder> configurator)
        {

            Container.Tooltip.Map = Container.Map;
            configurator(new MapMarkerDefaultsTooltipSettingsBuilder(Container.Tooltip));

            return this;
        }

        /// <summary>
        /// The default marker shape. Supported shapes are "pin" and "pinTarget".
        /// </summary>
        /// <param name="value">The value for Shape</param>
        public MapMarkerDefaultsSettingsBuilder Shape(MapMarkersShape value)
        {
            Container.Shape = value;
            return this;
        }

    }
}
