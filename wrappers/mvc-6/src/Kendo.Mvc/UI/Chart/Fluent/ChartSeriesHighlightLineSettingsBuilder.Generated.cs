using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesHighlightLineSettings
    /// </summary>
    public partial class ChartSeriesHighlightLineSettingsBuilder
        
    {
        /// <summary>
        /// The line color. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartSeriesHighlightLineSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The opacity of the line. By default the border is opaque.
        /// </summary>
        /// <param name="value">The value for Opacity</param>
        public ChartSeriesHighlightLineSettingsBuilder Opacity(double value)
        {
            Container.Opacity = value;
            return this;
        }

        /// <summary>
        /// The width of the line.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartSeriesHighlightLineSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

    }
}
