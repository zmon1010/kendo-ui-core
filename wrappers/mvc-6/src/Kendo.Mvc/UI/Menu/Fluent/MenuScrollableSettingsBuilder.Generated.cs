using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring MenuScrollableSettings
    /// </summary>
    public partial class MenuScrollableSettingsBuilder
        
    {
        /// <summary>
        /// Sets the scroll amount (in pixels) that the Menu scrolls when the scroll buttons are hovered. Each such distance is animated and then another animation starts with the same distance. If clicking a scroll button, the Menu scrolls with 2x the distance.
        /// </summary>
        /// <param name="value">The value for Distance</param>
        public MenuScrollableSettingsBuilder Distance(double value)
        {
            Container.Distance = value;
            return this;
        }

    }
}
