using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapLayerDefaultsBubbleSettings
    /// </summary>
    public partial class MapLayerDefaultsBubbleSettingsBuilder
        
    {
        public MapLayerDefaultsBubbleSettingsBuilder(MapLayerDefaultsBubbleSettings container)
        {
            Container = container;
        }

        protected MapLayerDefaultsBubbleSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
