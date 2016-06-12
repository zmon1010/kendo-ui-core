using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MapLayerTooltipContentSettings
    /// </summary>
    public partial class MapLayerTooltipContentSettingsBuilder
        
    {
        /// <summary>
        /// Specifies a URL or request options that the tooltip should load its content from.
        /// </summary>
        /// <param name="value">The value for Url</param>
        public MapLayerTooltipContentSettingsBuilder Url(string value)
        {
            Container.Url = value;
            return this;
        }

    }
}
