using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapLayerTooltipAnimationSettings
    /// </summary>
    public partial class MapLayerTooltipAnimationSettingsBuilder
        
    {
        /// <summary>
        /// The animation that will be used when a Tooltip closes.
        /// </summary>
        /// <param name="configurator">The configurator for the close setting.</param>
        public MapLayerTooltipAnimationSettingsBuilder Close(Action<MapLayerTooltipAnimationCloseSettingsBuilder> configurator)
        {

            Container.Close.Map = Container.Map;
            configurator(new MapLayerTooltipAnimationCloseSettingsBuilder(Container.Close));

            return this;
        }

        /// <summary>
        /// The animation that will be used when a Tooltip opens.
        /// </summary>
        /// <param name="configurator">The configurator for the open setting.</param>
        public MapLayerTooltipAnimationSettingsBuilder Open(Action<MapLayerTooltipAnimationOpenSettingsBuilder> configurator)
        {

            Container.Open.Map = Container.Map;
            configurator(new MapLayerTooltipAnimationOpenSettingsBuilder(Container.Open));

            return this;
        }

    }
}
