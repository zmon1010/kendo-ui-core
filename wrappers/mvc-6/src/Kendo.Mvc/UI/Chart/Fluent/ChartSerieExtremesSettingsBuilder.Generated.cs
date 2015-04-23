using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieExtremesSettings
    /// </summary>
    public partial class ChartSerieExtremesSettingsBuilder
        
    {
        /// <summary>
        /// The background color of the series outliers.
        /// </summary>
        /// <param name="value">The value for Background</param>
        public ChartSerieExtremesSettingsBuilder Background(string value)
        {
            Container.Background = value;
            return this;
        }

        /// <summary>
        /// The border of the extremes.
        /// </summary>
        /// <param name="configurator">The configurator for the border setting.</param>
        public ChartSerieExtremesSettingsBuilder Border(Action<ChartSerieExtremesBorderSettingsBuilder> configurator)
        {

            Container.Border.Chart = Container.Chart;
            configurator(new ChartSerieExtremesBorderSettingsBuilder(Container.Border));

            return this;
        }

        /// <summary>
        /// The extremes size in pixels.
        /// </summary>
        /// <param name="value">The value for Size</param>
        public ChartSerieExtremesSettingsBuilder Size(double value)
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
        public ChartSerieExtremesSettingsBuilder Type(string value)
        {
            Container.Type = value;
            return this;
        }

        /// <summary>
        /// The rotation angle of the extremes.
        /// </summary>
        /// <param name="value">The value for Rotation</param>
        public ChartSerieExtremesSettingsBuilder Rotation(double value)
        {
            Container.Rotation = value;
            return this;
        }

    }
}
