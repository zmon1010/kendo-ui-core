using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapControlsZoomSettings
    /// </summary>
    public partial class MapControlsZoomSettingsBuilder
        
    {
        /// <summary>
        /// The position of the zoom control. Predefined values are "topLeft", "topRight", "left", "bottomRight", "bottomLeft".
        /// </summary>
        /// <param name="value">The value for Position</param>
        public MapControlsZoomSettingsBuilder Position(MapControlsZoomPosition value)
        {
            Container.Position = value;
            return this;
        }

    }
}
