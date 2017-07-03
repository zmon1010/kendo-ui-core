using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesTooltipSettings
    /// </summary>
    public partial class ChartSeriesTooltipSettingsBuilder<T>
        where T : class 
    {
        /// <summary>
        /// The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Background</param>
        public ChartSeriesTooltipSettingsBuilder<T> Background(string value)
        {
            Container.Background = value;
            return this;
        }

        /// <summary>
        /// The border configuration options.
        /// </summary>
        /// <param name="configurator">The configurator for the border setting.</param>
        public ChartSeriesTooltipSettingsBuilder<T> Border(Action<ChartSeriesTooltipBorderSettingsBuilder<T>> configurator)
        {

            Container.Border.Chart = Container.Chart;
            configurator(new ChartSeriesTooltipBorderSettingsBuilder<T>(Container.Border));

            return this;
        }

        /// <summary>
        /// The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartSeriesTooltipSettingsBuilder<T> Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The tooltip font.
        /// </summary>
        /// <param name="value">The value for Font</param>
        public ChartSeriesTooltipSettingsBuilder<T> Font(string value)
        {
            Container.Font = value;
            return this;
        }

        /// <summary>
        /// The format of the labels. Uses kendo.format.Format placeholders: Area, bar, column, line, pie, radarArea, radarColumn and radarLine{0} - value; Bubble{0} - x value{1} - y value{2} - size value{3} - category name; Scatter, scatterLine{0} - x value{1} - y value; PolarArea, polarLine and polarScatter{0} - x value (degrees){1} - y value or Candlestick and OHLC{0} - open value{1} - high value{2} - low value{3} - close value{4} - category name.
        /// </summary>
        /// <param name="value">The value for Format</param>
        public ChartSeriesTooltipSettingsBuilder<T> Format(string value)
        {
            Container.Format = value;
            return this;
        }

        /// <summary>
        /// The padding of the tooltip. A numeric value will set all paddings.
        /// </summary>
        /// <param name="configurator">The configurator for the padding setting.</param>
        public ChartSeriesTooltipSettingsBuilder<T> Padding(Action<ChartSeriesTooltipPaddingSettingsBuilder<T>> configurator)
        {

            Container.Padding.Chart = Container.Chart;
            configurator(new ChartSeriesTooltipPaddingSettingsBuilder<T>(Container.Padding));

            return this;
        }

        /// <summary>
        /// The template which renders the tooltip.The fields which can be used in the template are: category - the category name; dataItem - the original data item used to construct the point. Will be null if binding to array.; series - the data series; value - the point value (either a number or an object); runningTotal - the sum of point values since the last "runningTotal" summary point. Available for waterfall series. or total - the sum of all previous series values. Available for waterfall series..
        /// </summary>
        /// <param name="value">The value for Template</param>
        public ChartSeriesTooltipSettingsBuilder<T> Template(string value)
        {
            Container.Template = value;
            return this;
        }

        /// <summary>
        /// The template which renders the tooltip.The fields which can be used in the template are: category - the category name; dataItem - the original data item used to construct the point. Will be null if binding to array.; series - the data series; value - the point value (either a number or an object); runningTotal - the sum of point values since the last "runningTotal" summary point. Available for waterfall series. or total - the sum of all previous series values. Available for waterfall series..
        /// </summary>
        /// <param name="value">The ID of the template element for Template</param>
        public ChartSeriesTooltipSettingsBuilder<T> TemplateId(string templateId)
        {
            Container.TemplateId = templateId;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the series tooltip. By default the series tooltip is not displayed.
        /// </summary>
        /// <param name="value">The value for Visible</param>
        public ChartSeriesTooltipSettingsBuilder<T> Visible(bool value)
        {
            Container.Visible = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the series tooltip. By default the series tooltip is not displayed.
        /// </summary>
        public ChartSeriesTooltipSettingsBuilder<T> Visible()
        {
            Container.Visible = true;
            return this;
        }

    }
}
