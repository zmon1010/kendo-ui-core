using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieLineSettings
    /// </summary>
    public partial class ChartSerieLineSettingsBuilder
        
    {
        /// <summary>
        /// The line color. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartSerieLineSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The line opacity. By default the line is opaque.
        /// </summary>
        /// <param name="value">The value for Opacity</param>
        public ChartSerieLineSettingsBuilder Opacity(double value)
        {
            Container.Opacity = value;
            return this;
        }

        /// <summary>
        /// The line width in pixels.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartSerieLineSettingsBuilder Width(string value)
        {
            Container.Width = value;
            return this;
        }

        /// <summary>
        /// The supported values are:
        /// </summary>
        /// <param name="value">The value for Style</param>
        public ChartSerieLineSettingsBuilder Style(string value)
        {
            Container.Style = value;
            return this;
        }

    }
}
