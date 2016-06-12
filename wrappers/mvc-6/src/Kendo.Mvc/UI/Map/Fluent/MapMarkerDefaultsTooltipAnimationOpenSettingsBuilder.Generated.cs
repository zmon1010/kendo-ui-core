using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapMarkerDefaultsTooltipAnimationOpenSettings
    /// </summary>
    public partial class MapMarkerDefaultsTooltipAnimationOpenSettingsBuilder
        
    {
        /// <summary>
        /// Effect to be used for opening of the Tooltip.
        /// </summary>
        /// <param name="value">The value for Effects</param>
        public MapMarkerDefaultsTooltipAnimationOpenSettingsBuilder Effects(string value)
        {
            Container.Effects = value;
            return this;
        }

        /// <summary>
        /// Defines the animation duration.
        /// </summary>
        /// <param name="value">The value for Duration</param>
        public MapMarkerDefaultsTooltipAnimationOpenSettingsBuilder Duration(double value)
        {
            Container.Duration = value;
            return this;
        }

    }
}
