using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieLabelsToSettings
    /// </summary>
    public partial class ChartSerieLabelsToSettingsBuilder
        
    {
        /// <summary>
        /// The background color of the to labels. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Background</param>
        public ChartSerieLabelsToSettingsBuilder Background(string value)
        {
            Container.Background = value;
            return this;
        }

        /// <summary>
        /// The border of the to labels.
        /// </summary>
        /// <param name="configurator">The configurator for the border setting.</param>
        public ChartSerieLabelsToSettingsBuilder Border(Action<ChartSerieLabelsToBorderSettingsBuilder> configurator)
        {

            Container.Border.Chart = Container.Chart;
            configurator(new ChartSerieLabelsToBorderSettingsBuilder(Container.Border));

            return this;
        }

        /// <summary>
        /// The text color of the to labels. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartSerieLabelsToSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The font style of the to labels.
        /// </summary>
        /// <param name="value">The value for Font</param>
        public ChartSerieLabelsToSettingsBuilder Font(string value)
        {
            Container.Font = value;
            return this;
        }

        /// <summary>
        /// The format of the to labels. Uses kendo.format.
        /// </summary>
        /// <param name="value">The value for Format</param>
        public ChartSerieLabelsToSettingsBuilder Format(string value)
        {
            Container.Format = value;
            return this;
        }

        /// <summary>
        /// The margin of the to labels. A numeric value will set all margins.
        /// </summary>
        /// <param name="configurator">The configurator for the margin setting.</param>
        public ChartSerieLabelsToSettingsBuilder Margin(Action<ChartSerieLabelsToMarginSettingsBuilder> configurator)
        {

            Container.Margin.Chart = Container.Chart;
            configurator(new ChartSerieLabelsToMarginSettingsBuilder(Container.Margin));

            return this;
        }

        /// <summary>
        /// The padding of the to labels. A numeric value will set all paddings.
        /// </summary>
        /// <param name="configurator">The configurator for the padding setting.</param>
        public ChartSerieLabelsToSettingsBuilder Padding(Action<ChartSerieLabelsToPaddingSettingsBuilder> configurator)
        {

            Container.Padding.Chart = Container.Chart;
            configurator(new ChartSerieLabelsToPaddingSettingsBuilder(Container.Padding));

            return this;
        }

        /// <summary>
        /// The position of the to labels.
        /// </summary>
        /// <param name="value">The value for Position</param>
        public ChartSerieLabelsToSettingsBuilder Position(string value)
        {
            Container.Position = value;
            return this;
        }

        /// <summary>
        /// The template which renders the chart series to label.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value for Template</param>
        public ChartSerieLabelsToSettingsBuilder Template(string value)
        {
            Container.Template = value;
            return this;
        }

        /// <summary>
        /// The template which renders the chart series to label.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The ID of the template element for Template</param>
        public ChartSerieLabelsToSettingsBuilder TemplateId(string templateId)
        {
            Container.TemplateId = templateId;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the series to labels. By default chart series to labels are not displayed.
        /// </summary>
        /// <param name="value">The value for Visible</param>
        public ChartSerieLabelsToSettingsBuilder Visible(bool value)
        {
            Container.Visible = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the series to labels. By default chart series to labels are not displayed.
        /// </summary>
        public ChartSerieLabelsToSettingsBuilder Visible()
        {
            Container.Visible = true;
            return this;
        }

    }
}
