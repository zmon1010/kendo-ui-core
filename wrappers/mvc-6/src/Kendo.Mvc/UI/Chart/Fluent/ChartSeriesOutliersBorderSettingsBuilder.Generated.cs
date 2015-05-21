using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesOutliersBorderSettings
    /// </summary>
    public partial class ChartSeriesOutliersBorderSettingsBuilder
        
    {
        /// <summary>
        /// The color of the border. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartSeriesOutliersBorderSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartSeriesOutliersBorderSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

    }
}
