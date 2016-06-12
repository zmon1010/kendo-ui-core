using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapMarkerTooltipAnimationSettings
    /// </summary>
    public partial class MapMarkerTooltipAnimationSettingsBuilder
        
    {
        /// <summary>
        /// The animation that will be used when a Tooltip closes.
        /// </summary>
        /// <param name="configurator">The configurator for the close setting.</param>
        public MapMarkerTooltipAnimationSettingsBuilder Close(Action<MapMarkerTooltipAnimationCloseSettingsBuilder> configurator)
        {

            Container.Close.Map = Container.Map;
            configurator(new MapMarkerTooltipAnimationCloseSettingsBuilder(Container.Close));

            return this;
        }

        /// <summary>
        /// The animation that will be used when a Tooltip opens.
        /// </summary>
        /// <param name="configurator">The configurator for the open setting.</param>
        public MapMarkerTooltipAnimationSettingsBuilder Open(Action<MapMarkerTooltipAnimationOpenSettingsBuilder> configurator)
        {

            Container.Open.Map = Container.Map;
            configurator(new MapMarkerTooltipAnimationOpenSettingsBuilder(Container.Open));

            return this;
        }

    }
}
