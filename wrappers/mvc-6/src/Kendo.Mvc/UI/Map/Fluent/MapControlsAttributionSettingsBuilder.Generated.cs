using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapControlsAttributionSettings
    /// </summary>
    public partial class MapControlsAttributionSettingsBuilder
        
    {
        /// <summary>
        /// The position of the attribution control. Predefined values are "topLeft", "topRight", "left", "bottomRight", "bottomLeft".
        /// </summary>
        /// <param name="value">The value for Position</param>
        public MapControlsAttributionSettingsBuilder Position(MapControlsAttributionPosition value)
        {
            Container.Position = value;
            return this;
        }

    }
}
