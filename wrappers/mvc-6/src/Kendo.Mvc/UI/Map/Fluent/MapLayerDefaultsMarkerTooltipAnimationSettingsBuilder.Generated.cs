using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapLayerDefaultsMarkerTooltipAnimationSettings
    /// </summary>
    public partial class MapLayerDefaultsMarkerTooltipAnimationSettingsBuilder
        
    {
        /// <summary>
        /// The animation that will be used when a Tooltip closes.
        /// </summary>
        /// <param name="configurator">The configurator for the close setting.</param>
        public MapLayerDefaultsMarkerTooltipAnimationSettingsBuilder Close(Action<MapLayerDefaultsMarkerTooltipAnimationCloseSettingsBuilder> configurator)
        {

            Container.Close.Map = Container.Map;
            configurator(new MapLayerDefaultsMarkerTooltipAnimationCloseSettingsBuilder(Container.Close));

            return this;
        }

        /// <summary>
        /// The animation that will be used when a Tooltip opens.
        /// </summary>
        /// <param name="configurator">The configurator for the open setting.</param>
        public MapLayerDefaultsMarkerTooltipAnimationSettingsBuilder Open(Action<MapLayerDefaultsMarkerTooltipAnimationOpenSettingsBuilder> configurator)
        {

            Container.Open.Map = Container.Map;
            configurator(new MapLayerDefaultsMarkerTooltipAnimationOpenSettingsBuilder(Container.Open));

            return this;
        }

    }
}
