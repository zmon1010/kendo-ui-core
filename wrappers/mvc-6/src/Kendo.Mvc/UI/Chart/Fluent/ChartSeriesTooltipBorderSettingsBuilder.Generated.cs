using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesTooltipBorderSettings
    /// </summary>
    public partial class ChartSeriesTooltipBorderSettingsBuilder
        
    {
        /// <summary>
        /// The color of the border.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartSeriesTooltipBorderSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartSeriesTooltipBorderSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

    }
}
