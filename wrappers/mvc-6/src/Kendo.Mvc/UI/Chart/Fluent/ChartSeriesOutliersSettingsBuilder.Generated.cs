using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesOutliersSettings
    /// </summary>
    public partial class ChartSeriesOutliersSettingsBuilder
        
    {
        /// <summary>
        /// The background color of the series outliers.
        /// </summary>
        /// <param name="value">The value for Background</param>
        public ChartSeriesOutliersSettingsBuilder Background(string value)
        {
            Container.Background = value;
            return this;
        }

        /// <summary>
        /// The border of the outliers.
        /// </summary>
        /// <param name="configurator">The configurator for the border setting.</param>
        public ChartSeriesOutliersSettingsBuilder Border(Action<ChartSeriesOutliersBorderSettingsBuilder> configurator)
        {

            Container.Border.Chart = Container.Chart;
            configurator(new ChartSeriesOutliersBorderSettingsBuilder(Container.Border));

            return this;
        }

        /// <summary>
        /// The marker size in pixels.
        /// </summary>
        /// <param name="value">The value for Size</param>
        public ChartSeriesOutliersSettingsBuilder Size(double value)
        {
            Container.Size = value;
            return this;
        }

        /// <summary>
        /// The outliers shape.The supported values are:
		/// * "circle" - the marker shape is circle.
		/// * "square" - the marker shape is square.
		/// * "triangle" - the marker shape is triangle.
		/// * "cross" - the marker shape is cross.
        /// </summary>
        /// <param name="value">The value for Type</param>
        public ChartSeriesOutliersSettingsBuilder Type(string value)
        {
            Container.Type = value;
            return this;
        }

        /// <summary>
        /// The rotation angle of the outliers.
        /// </summary>
        /// <param name="value">The value for Rotation</param>
        public ChartSeriesOutliersSettingsBuilder Rotation(double value)
        {
            Container.Rotation = value;
            return this;
        }

    }
}
