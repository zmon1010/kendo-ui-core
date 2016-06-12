using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapMarkerDefaultsTooltipAnimationSettings
    /// </summary>
    public partial class MapMarkerDefaultsTooltipAnimationSettingsBuilder
        
    {
        /// <summary>
        /// The animation that will be used when a Tooltip closes.
        /// </summary>
        /// <param name="configurator">The configurator for the close setting.</param>
        public MapMarkerDefaultsTooltipAnimationSettingsBuilder Close(Action<MapMarkerDefaultsTooltipAnimationCloseSettingsBuilder> configurator)
        {

            Container.Close.Map = Container.Map;
            configurator(new MapMarkerDefaultsTooltipAnimationCloseSettingsBuilder(Container.Close));

            return this;
        }

        /// <summary>
        /// The animation that will be used when a Tooltip opens.
        /// </summary>
        /// <param name="configurator">The configurator for the open setting.</param>
        public MapMarkerDefaultsTooltipAnimationSettingsBuilder Open(Action<MapMarkerDefaultsTooltipAnimationOpenSettingsBuilder> configurator)
        {

            Container.Open.Map = Container.Map;
            configurator(new MapMarkerDefaultsTooltipAnimationOpenSettingsBuilder(Container.Open));

            return this;
        }

    }
}
