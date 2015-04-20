using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring RadialGaugeScaleLabelsBorderSettings
    /// </summary>
    public partial class RadialGaugeScaleLabelsBorderSettingsBuilder
        
    {
        /// <summary>
        /// The color of the border. Any valid CSS color string will work here, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public RadialGaugeScaleLabelsBorderSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The dash type of the border.
        /// </summary>
        /// <param name="value">The value for DashType</param>
        public RadialGaugeScaleLabelsBorderSettingsBuilder DashType(string value)
        {
            Container.DashType = value;
            return this;
        }

        /// <summary>
        /// The width of the border.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public RadialGaugeScaleLabelsBorderSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

    }
}
