using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapMarkerDefaultsTooltipAnimationCloseSettings
    /// </summary>
    public partial class MapMarkerDefaultsTooltipAnimationCloseSettingsBuilder
        
    {
        /// <summary>
        /// Effect to be used for closing of the tooltip.
        /// </summary>
        /// <param name="value">The value for Effects</param>
        public MapMarkerDefaultsTooltipAnimationCloseSettingsBuilder Effects(string value)
        {
            Container.Effects = value;
            return this;
        }

        /// <summary>
        /// Defines the animation duration.
        /// </summary>
        /// <param name="value">The value for Duration</param>
        public MapMarkerDefaultsTooltipAnimationCloseSettingsBuilder Duration(double value)
        {
            Container.Duration = value;
            return this;
        }

    }
}
