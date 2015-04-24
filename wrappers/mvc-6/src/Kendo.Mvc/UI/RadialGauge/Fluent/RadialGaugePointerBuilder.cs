using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring RadialGaugePointer
    /// </summary>
    public partial class RadialGaugePointerBuilder 
    {
        public RadialGaugePointerBuilder(RadialGaugePointer container)
        {
            Container = container;
        }

        protected RadialGaugePointer Container
        {
            get;
            private set;
        }

        /// <summary>
        /// The cap configuration options.
        /// </summary>
        /// <param name="configurator">The configurator for the cap setting.</param>
        public RadialGaugePointerBuilder Cap(Action<RadialGaugePointerCapSettingsBuilder> configurator)
        {

            Container.Cap.RadialGauge = Container.RadialGauge;
            configurator(new RadialGaugePointerCapSettingsBuilder(Container.Cap));

            return this;
        }

        /// <summary>
        /// The color of the pointer.
		/// Any valid CSS color string will work here, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public RadialGaugePointerBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The value of the gauge.
        /// </summary>
        /// <param name="value">The value for Value</param>
        public RadialGaugePointerBuilder Value(double value)
        {
            Container.Value = value;
            return this;
        }
    }
}
