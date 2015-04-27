using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring LinearGaugePointer
    /// </summary>
    public partial class LinearGaugePointerBuilder
        
    {
        public LinearGaugePointerBuilder(LinearGaugePointer container)
        {
            Container = container;
        }

        protected LinearGaugePointer Container
        {
            get;
            private set;
        }

        /// <summary>
        /// The border of the pointer.
        /// </summary>
        /// <param name="configurator">The configurator for the border setting.</param>
        public LinearGaugePointerBuilder Border(Action<LinearGaugePointerBorderSettingsBuilder> configurator)
        {

            Container.Border.LinearGauge = Container.LinearGauge;
            configurator(new LinearGaugePointerBorderSettingsBuilder(Container.Border));

            return this;
        }

        /// <summary>
        /// The color of the pointer.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public LinearGaugePointerBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The margin of the pointer.
        /// </summary>
        /// <param name="value">The value for Margin</param>
        public LinearGaugePointerBuilder Margin(double value)
        {
            Container.Margin = value;
            return this;
        }

        /// <summary>
        /// The opacity of the pointer.
		/// Any valid CSS color string will work here, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Opacity</param>
        public LinearGaugePointerBuilder Opacity(double value)
        {
            Container.Opacity = value;
            return this;
        }

        /// <summary>
        /// The shape of the pointer.
        /// </summary>
        /// <param name="value">The value for Shape</param>
        public LinearGaugePointerBuilder Shape(string value)
        {
            Container.Shape = value;
            return this;
        }

        /// <summary>
        /// The size of the pointer.
        /// </summary>
        /// <param name="value">The value for Size</param>
        public LinearGaugePointerBuilder Size(double value)
        {
            Container.Size = value;
            return this;
        }

        /// <summary>
        /// The element arround/under the pointer.
		/// (available only for 'barIndicator' shape)
        /// </summary>
        /// <param name="configurator">The configurator for the track setting.</param>
        public LinearGaugePointerBuilder Track(Action<LinearGaugePointerTrackSettingsBuilder> configurator)
        {

            Container.Track.LinearGauge = Container.LinearGauge;
            configurator(new LinearGaugePointerTrackSettingsBuilder(Container.Track));

            return this;
        }

        /// <summary>
        /// The value of the gauge.
        /// </summary>
        /// <param name="value">The value for Value</param>
        public LinearGaugePointerBuilder Value(double value)
        {
            Container.Value = value;
            return this;
        }
    }
}
