using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieMarkersSettings
    /// </summary>
    public partial class ChartSerieMarkersSettingsBuilder
        
    {
        /// <summary>
        /// The background color of the series markers.
        /// </summary>
        /// <param name="value">The value for Background</param>
        public ChartSerieMarkersSettingsBuilder Background(string value)
        {
            Container.Background = value;
            return this;
        }

        /// <summary>
        /// The border of the markers.
        /// </summary>
        /// <param name="configurator">The configurator for the border setting.</param>
        public ChartSerieMarkersSettingsBuilder Border(Action<ChartSerieMarkersBorderSettingsBuilder> configurator)
        {

            Container.Border.Chart = Container.Chart;
            configurator(new ChartSerieMarkersBorderSettingsBuilder(Container.Border));

            return this;
        }

        /// <summary>
        /// The marker size in pixels.
        /// </summary>
        /// <param name="value">The value for Size</param>
        public ChartSerieMarkersSettingsBuilder Size(double value)
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
        public ChartSerieMarkersSettingsBuilder Type(string value)
        {
            Container.Type = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the series markers. By default chart series markers are not displayed.
        /// </summary>
        /// <param name="value">The value for Visible</param>
        public ChartSerieMarkersSettingsBuilder Visible(bool value)
        {
            Container.Visible = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the series markers. By default chart series markers are not displayed.
        /// </summary>
        public ChartSerieMarkersSettingsBuilder Visible()
        {
            Container.Visible = true;
            return this;
        }

        /// <summary>
        /// A function that can be used to create a custom visual for the markers. The available argument fields are:
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will be evaluated.</param>
        public ChartSerieMarkersSettingsBuilder Visual(string handler)
        {
            Container.Visual = new ClientHandlerDescriptor { HandlerName = handler };
            return this;
        }

        /// <summary>
        /// A function that can be used to create a custom visual for the markers. The available argument fields are:
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ChartSerieMarkersSettingsBuilder Visual(Func<object, object> handler)
        {
            Container.Visual = new ClientHandlerDescriptor { TemplateDelegate = handler };
            return this;
        }
        /// <summary>
        /// The rotation angle of the markers.
        /// </summary>
        /// <param name="value">The value for Rotation</param>
        public ChartSerieMarkersSettingsBuilder Rotation(double value)
        {
            Container.Rotation = value;
            return this;
        }

    }
}
