using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring RadialGaugePointerCapSettings
    /// </summary>
    public partial class RadialGaugePointerCapSettingsBuilder
        
    {
        /// <summary>
        /// The color of the cap.
		/// Any valid CSS color string will work here, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public RadialGaugePointerCapSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The size of the cap in percents. (from 0 to 1)
        /// </summary>
        /// <param name="value">The value for Size</param>
        public RadialGaugePointerCapSettingsBuilder Size(double value)
        {
            Container.Size = value;
            return this;
        }

    }
}
