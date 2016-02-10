using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesExtremesSettings
    /// </summary>
    public partial class ChartSeriesExtremesSettingsBuilder<T>
        where T : class 
    {
        /// <summary>
        /// The background color of the series outliers.
        /// </summary>
        /// <param name="value">The value for Background</param>
        public ChartSeriesExtremesSettingsBuilder<T> Background(string value)
        {
            Container.Background = value;
            return this;
        }

        /// <summary>
        /// The border of the extremes.
        /// </summary>
        /// <param name="configurator">The configurator for the border setting.</param>
        public ChartSeriesExtremesSettingsBuilder<T> Border(Action<ChartSeriesExtremesBorderSettingsBuilder<T>> configurator)
        {

            Container.Border.Chart = Container.Chart;
            configurator(new ChartSeriesExtremesBorderSettingsBuilder<T>(Container.Border));

            return this;
        }

        /// <summary>
        /// The extremes size in pixels.
        /// </summary>
        /// <param name="value">The value for Size</param>
        public ChartSeriesExtremesSettingsBuilder<T> Size(double value)
        {
            Container.Size = value;
            return this;
        }

        /// <summary>
        /// The extremes shape.The supported values are:
		/// * "circle" - the marker shape is circle.
		/// * "square" - the marker shape is square.
		/// * "triangle" - the marker shape is triangle.
		/// * "cross" - the marker shape is cross.
        /// </summary>
        /// <param name="value">The value for Type</param>
        public ChartSeriesExtremesSettingsBuilder<T> Type(string value)
        {
            Container.Type = value;
            return this;
        }

        /// <summary>
        /// The rotation angle of the extremes.
        /// </summary>
        /// <param name="value">The value for Rotation</param>
        public ChartSeriesExtremesSettingsBuilder<T> Rotation(double value)
        {
            Container.Rotation = value;
            return this;
        }

    }
}
