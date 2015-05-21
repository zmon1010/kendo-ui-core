using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesLabelsSettings
    /// </summary>
    public partial class ChartSeriesLabelsSettingsBuilder
        
    {
        /// <summary>
        /// The label alignment when series.type is set to "donut", "funnel" or "pie".The supported values  for "donut" and "pie" are:The supported values for "funnel" are:
        /// </summary>
        /// <param name="value">The value for Align</param>
        public ChartSeriesLabelsSettingsBuilder Align(string value)
        {
            Container.Align = value;
            return this;
        }

        /// <summary>
        /// The background color of the labels. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Background</param>
        public ChartSeriesLabelsSettingsBuilder Background(string value)
        {
            Container.Background = value;
            return this;
        }

        /// <summary>
        /// The border of the labels.
        /// </summary>
        /// <param name="configurator">The configurator for the border setting.</param>
        public ChartSeriesLabelsSettingsBuilder Border(Action<ChartSeriesLabelsBorderSettingsBuilder> configurator)
        {

            Container.Border.Chart = Container.Chart;
            configurator(new ChartSeriesLabelsBorderSettingsBuilder(Container.Border));

            return this;
        }

        /// <summary>
        /// The text color of the labels. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartSeriesLabelsSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The distance of the labels when series.type is set to "donut" or "pie".
        /// </summary>
        /// <param name="value">The value for Distance</param>
        public ChartSeriesLabelsSettingsBuilder Distance(double value)
        {
            Container.Distance = value;
            return this;
        }

        /// <summary>
        /// The font style of the labels.
        /// </summary>
        /// <param name="value">The value for Font</param>
        public ChartSeriesLabelsSettingsBuilder Font(string value)
        {
            Container.Font = value;
            return this;
        }

        /// <summary>
        /// The format of the labels. Uses kendo.format.
        /// </summary>
        /// <param name="value">The value for Format</param>
        public ChartSeriesLabelsSettingsBuilder Format(string value)
        {
            Container.Format = value;
            return this;
        }

        /// <summary>
        /// The margin of the labels. A numeric value will set all margins.
        /// </summary>
        /// <param name="configurator">The configurator for the margin setting.</param>
        public ChartSeriesLabelsSettingsBuilder Margin(Action<ChartSeriesLabelsMarginSettingsBuilder> configurator)
        {

            Container.Margin.Chart = Container.Chart;
            configurator(new ChartSeriesLabelsMarginSettingsBuilder(Container.Margin));

            return this;
        }

        /// <summary>
        /// The padding of the labels. A numeric value will set all paddings.
        /// </summary>
        /// <param name="configurator">The configurator for the padding setting.</param>
        public ChartSeriesLabelsSettingsBuilder Padding(Action<ChartSeriesLabelsPaddingSettingsBuilder> configurator)
        {

            Container.Padding.Chart = Container.Chart;
            configurator(new ChartSeriesLabelsPaddingSettingsBuilder(Container.Padding));

            return this;
        }

        /// <summary>
        /// The position of the labels.
        /// </summary>
        /// <param name="value">The value for Position</param>
        public ChartSeriesLabelsSettingsBuilder Position(string value)
        {
            Container.Position = value;
            return this;
        }

        /// <summary>
        /// The template which renders the chart series label.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value for Template</param>
        public ChartSeriesLabelsSettingsBuilder Template(string value)
        {
            Container.Template = value;
            return this;
        }

        /// <summary>
        /// The template which renders the chart series label.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The ID of the template element for Template</param>
        public ChartSeriesLabelsSettingsBuilder TemplateId(string templateId)
        {
            Container.TemplateId = templateId;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the series labels. By default chart series labels are not displayed.
        /// </summary>
        /// <param name="value">The value for Visible</param>
        public ChartSeriesLabelsSettingsBuilder Visible(bool value)
        {
            Container.Visible = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the series labels. By default chart series labels are not displayed.
        /// </summary>
        public ChartSeriesLabelsSettingsBuilder Visible()
        {
            Container.Visible = true;
            return this;
        }

        /// <summary>
        /// A function that can be used to create a custom visual for the labels. The available argument fields are:
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will be evaluated.</param>
        public ChartSeriesLabelsSettingsBuilder Visual(string handler)
        {
            Container.Visual = new ClientHandlerDescriptor { HandlerName = handler };
            return this;
        }

        /// <summary>
        /// A function that can be used to create a custom visual for the labels. The available argument fields are:
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ChartSeriesLabelsSettingsBuilder Visual(Func<object, object> handler)
        {
            Container.Visual = new ClientHandlerDescriptor { TemplateDelegate = handler };
            return this;
        }
        /// <summary>
        /// The chart series from label configuration.
        /// </summary>
        /// <param name="configurator">The configurator for the from setting.</param>
        public ChartSeriesLabelsSettingsBuilder From(Action<ChartSeriesLabelsFromSettingsBuilder> configurator)
        {

            Container.From.Chart = Container.Chart;
            configurator(new ChartSeriesLabelsFromSettingsBuilder(Container.From));

            return this;
        }

        /// <summary>
        /// The chart series to label configuration.
        /// </summary>
        /// <param name="configurator">The configurator for the to setting.</param>
        public ChartSeriesLabelsSettingsBuilder To(Action<ChartSeriesLabelsToSettingsBuilder> configurator)
        {

            Container.To.Chart = Container.Chart;
            configurator(new ChartSeriesLabelsToSettingsBuilder(Container.To));

            return this;
        }

    }
}
