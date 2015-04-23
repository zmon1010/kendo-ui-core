using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieOutliersSettings
    /// </summary>
    public partial class ChartSerieOutliersSettingsBuilder
        
    {
        /// <summary>
        /// The background color of the series outliers.
        /// </summary>
        /// <param name="value">The value for Background</param>
        public ChartSerieOutliersSettingsBuilder Background(string value)
        {
            Container.Background = value;
            return this;
        }

        /// <summary>
        /// The border of the outliers.
        /// </summary>
        /// <param name="configurator">The configurator for the border setting.</param>
        public ChartSerieOutliersSettingsBuilder Border(Action<ChartSerieOutliersBorderSettingsBuilder> configurator)
        {

            Container.Border.Chart = Container.Chart;
            configurator(new ChartSerieOutliersBorderSettingsBuilder(Container.Border));

            return this;
        }

        /// <summary>
        /// The marker size in pixels.
        /// </summary>
        /// <param name="value">The value for Size</param>
        public ChartSerieOutliersSettingsBuilder Size(double value)
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
        public ChartSerieOutliersSettingsBuilder Type(string value)
        {
            Container.Type = value;
            return this;
        }

        /// <summary>
        /// The rotation angle of the outliers.
        /// </summary>
        /// <param name="value">The value for Rotation</param>
        public ChartSerieOutliersSettingsBuilder Rotation(double value)
        {
            Container.Rotation = value;
            return this;
        }

    }
}
