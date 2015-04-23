using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieLabelsFromSettings
    /// </summary>
    public partial class ChartSerieLabelsFromSettingsBuilder
        
    {
        /// <summary>
        /// The background color of the from labels. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Background</param>
        public ChartSerieLabelsFromSettingsBuilder Background(string value)
        {
            Container.Background = value;
            return this;
        }

        /// <summary>
        /// The border of the from labels.
        /// </summary>
        /// <param name="configurator">The configurator for the border setting.</param>
        public ChartSerieLabelsFromSettingsBuilder Border(Action<ChartSerieLabelsFromBorderSettingsBuilder> configurator)
        {

            Container.Border.Chart = Container.Chart;
            configurator(new ChartSerieLabelsFromBorderSettingsBuilder(Container.Border));

            return this;
        }

        /// <summary>
        /// The text color of the from labels. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartSerieLabelsFromSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The font style of the from labels.
        /// </summary>
        /// <param name="value">The value for Font</param>
        public ChartSerieLabelsFromSettingsBuilder Font(string value)
        {
            Container.Font = value;
            return this;
        }

        /// <summary>
        /// The format of the from labels. Uses kendo.format.
        /// </summary>
        /// <param name="value">The value for Format</param>
        public ChartSerieLabelsFromSettingsBuilder Format(string value)
        {
            Container.Format = value;
            return this;
        }

        /// <summary>
        /// The margin of the from labels. A numeric value will set all margins.
        /// </summary>
        /// <param name="configurator">The configurator for the margin setting.</param>
        public ChartSerieLabelsFromSettingsBuilder Margin(Action<ChartSerieLabelsFromMarginSettingsBuilder> configurator)
        {

            Container.Margin.Chart = Container.Chart;
            configurator(new ChartSerieLabelsFromMarginSettingsBuilder(Container.Margin));

            return this;
        }

        /// <summary>
        /// The padding of the from labels. A numeric value will set all paddings.
        /// </summary>
        /// <param name="configurator">The configurator for the padding setting.</param>
        public ChartSerieLabelsFromSettingsBuilder Padding(Action<ChartSerieLabelsFromPaddingSettingsBuilder> configurator)
        {

            Container.Padding.Chart = Container.Chart;
            configurator(new ChartSerieLabelsFromPaddingSettingsBuilder(Container.Padding));

            return this;
        }

        /// <summary>
        /// The position of the from labels.
        /// </summary>
        /// <param name="value">The value for Position</param>
        public ChartSerieLabelsFromSettingsBuilder Position(string value)
        {
            Container.Position = value;
            return this;
        }

        /// <summary>
        /// The template which renders the chart series from label.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value for Template</param>
        public ChartSerieLabelsFromSettingsBuilder Template(string value)
        {
            Container.Template = value;
            return this;
        }

        /// <summary>
        /// The template which renders the chart series from label.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The ID of the template element for Template</param>
        public ChartSerieLabelsFromSettingsBuilder TemplateId(string templateId)
        {
            Container.TemplateId = templateId;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the series from labels. By default chart series from labels are not displayed.
        /// </summary>
        /// <param name="value">The value for Visible</param>
        public ChartSerieLabelsFromSettingsBuilder Visible(bool value)
        {
            Container.Visible = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the series from labels. By default chart series from labels are not displayed.
        /// </summary>
        public ChartSerieLabelsFromSettingsBuilder Visible()
        {
            Container.Visible = true;
            return this;
        }

    }
}
