using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesMarkersSettings
    /// </summary>
    public partial class ChartSeriesMarkersSettingsBuilder
        
    {
        /// <summary>
        /// The background color of the series markers.
        /// </summary>
        /// <param name="value">The value for Background</param>
        public ChartSeriesMarkersSettingsBuilder Background(string value)
        {
            Container.Background = value;
            return this;
        }

        /// <summary>
        /// The border of the markers.
        /// </summary>
        /// <param name="configurator">The configurator for the border setting.</param>
        public ChartSeriesMarkersSettingsBuilder Border(Action<ChartSeriesMarkersBorderSettingsBuilder> configurator)
        {

            Container.Border.Chart = Container.Chart;
            configurator(new ChartSeriesMarkersBorderSettingsBuilder(Container.Border));

            return this;
        }

        /// <summary>
        /// The marker size in pixels.
        /// </summary>
        /// <param name="value">The value for Size</param>
        public ChartSeriesMarkersSettingsBuilder Size(double value)
        {
            Container.Size = value;
            return this;
        }

        /// <summary>
        /// The markers shape.The supported values are:
		/// * "circle" - the marker shape is circle.
		/// * "square" - the marker shape is square.
		/// * "triangle" - the marker shape is triangle.
		/// * "cross" - the marker shape is cross.
        /// </summary>
        /// <param name="value">The value for Type</param>
        public ChartSeriesMarkersSettingsBuilder Type(string value)
        {
            Container.Type = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the series markers. By default chart series markers are not displayed.
        /// </summary>
        /// <param name="value">The value for Visible</param>
        public ChartSeriesMarkersSettingsBuilder Visible(bool value)
        {
            Container.Visible = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the series markers. By default chart series markers are not displayed.
        /// </summary>
        public ChartSeriesMarkersSettingsBuilder Visible()
        {
            Container.Visible = true;
            return this;
        }

        /// <summary>
        /// A function that can be used to create a custom visual for the markers. The available argument fields are:
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will be evaluated.</param>
        public ChartSeriesMarkersSettingsBuilder Visual(string handler)
        {
            Container.Visual = new ClientHandlerDescriptor { HandlerName = handler };
            return this;
        }

        /// <summary>
        /// A function that can be used to create a custom visual for the markers. The available argument fields are:
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ChartSeriesMarkersSettingsBuilder Visual(Func<object, object> handler)
        {
            Container.Visual = new ClientHandlerDescriptor { TemplateDelegate = handler };
            return this;
        }
        /// <summary>
        /// The rotation angle of the markers.
        /// </summary>
        /// <param name="value">The value for Rotation</param>
        public ChartSeriesMarkersSettingsBuilder Rotation(double value)
        {
            Container.Rotation = value;
            return this;
        }

    }
}
