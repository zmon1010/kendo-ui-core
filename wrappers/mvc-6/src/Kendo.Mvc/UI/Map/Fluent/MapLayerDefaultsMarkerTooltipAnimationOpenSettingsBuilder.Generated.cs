using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapLayerDefaultsMarkerTooltipAnimationOpenSettings
    /// </summary>
    public partial class MapLayerDefaultsMarkerTooltipAnimationOpenSettingsBuilder
        
    {
        /// <summary>
        /// Effect to be used for opening of the Tooltip.
        /// </summary>
        /// <param name="value">The value for Effects</param>
        public MapLayerDefaultsMarkerTooltipAnimationOpenSettingsBuilder Effects(string value)
        {
            Container.Effects = value;
            return this;
        }

        /// <summary>
        /// Defines the animation duration.
        /// </summary>
        /// <param name="value">The value for Duration</param>
        public MapLayerDefaultsMarkerTooltipAnimationOpenSettingsBuilder Duration(double value)
        {
            Container.Duration = value;
            return this;
        }

    }
}
