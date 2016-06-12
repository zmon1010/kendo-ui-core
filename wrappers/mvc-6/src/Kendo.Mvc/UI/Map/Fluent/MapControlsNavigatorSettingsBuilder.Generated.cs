using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapControlsNavigatorSettings
    /// </summary>
    public partial class MapControlsNavigatorSettingsBuilder
        
    {
        /// <summary>
        /// The position of the navigator control. Predefined values are "topLeft", "topRight", "left", "bottomRight", "bottomLeft".
        /// </summary>
        /// <param name="value">The value for Position</param>
        public MapControlsNavigatorSettingsBuilder Position(MapControlsNavigatorPosition value)
        {
            Container.Position = value;
            return this;
        }

    }
}
