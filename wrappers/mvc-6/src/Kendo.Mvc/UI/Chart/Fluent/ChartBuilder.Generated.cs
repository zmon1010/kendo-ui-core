using System;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI Chart
    /// </summary>
    public partial class ChartBuilder
        
    {
        /// <summary>
        /// If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the
		/// data source is fired. By default the widget will bind to the data source specified in the configuration.
        /// </summary>
        /// <param name="value">The value for AutoBind</param>
        public ChartBuilder AutoBind(bool value)
        {
            Container.AutoBind = value;
            return this;
        }

        /// <summary>
        /// The category axis configuration options.
        /// </summary>
        /// <param name="configurator">The configurator for the categoryaxis setting.</param>
        public ChartBuilder CategoryAxis(Action<ChartCategoryAxisFactory> configurator)
        {

            configurator(new ChartCategoryAxisFactory(Container.CategoryAxis)
            {
                Chart = Container
            });

            return this;
        }

        /// <summary>
        /// The chart area configuration options. Represents the entire visible area of the chart.
        /// </summary>
        /// <param name="configurator">The configurator for the chartarea setting.</param>
        public ChartBuilder ChartArea(Action<ChartChartAreaSettingsBuilder> configurator)
        {

            Container.ChartArea.Chart = Container;
            configurator(new ChartChartAreaSettingsBuilder(Container.ChartArea));

            return this;
        }

        /// <summary>
        /// The chart legend configuration options.
        /// </summary>
        /// <param name="configurator">The configurator for the legend setting.</param>
        public ChartBuilder Legend(Action<ChartLegendSettingsBuilder> configurator)
        {

            Container.Legend.Chart = Container;
            configurator(new ChartLegendSettingsBuilder(Container.Legend));

            return this;
        }

        /// <summary>
        /// The chart panes configuration.Panes are used to split the chart in two or more parts. The panes are ordered from top to bottom.Each axis can be associated with a pane by setting its pane option to the name of the desired pane.
		/// Axis that don't have specified pane are placed in the top (default) pane.Series are moved to the desired pane by associating them with an axis.
        /// </summary>
        /// <param name="configurator">The configurator for the panes setting.</param>
        public ChartBuilder Panes(Action<ChartPaneFactory> configurator)
        {

            configurator(new ChartPaneFactory(Container.Panes)
            {
                Chart = Container
            });

            return this;
        }

        /// <summary>
        /// Configures the export settings for the saveAsPDF method.
        /// </summary>
        /// <param name="configurator">The configurator for the pdf setting.</param>
        public ChartBuilder Pdf(Action<ChartPdfSettingsBuilder> configurator)
        {

            Container.Pdf.Chart = Container;
            configurator(new ChartPdfSettingsBuilder(Container.Pdf));

            return this;
        }

        /// <summary>
        /// The plot area configuration options. The plot area is the area which displays the series.
        /// </summary>
        /// <param name="configurator">The configurator for the plotarea setting.</param>
        public ChartBuilder PlotArea(Action<ChartPlotAreaSettingsBuilder> configurator)
        {

            Container.PlotArea.Chart = Container;
            configurator(new ChartPlotAreaSettingsBuilder(Container.PlotArea));

            return this;
        }

        /// <summary>
        /// The configuration of the chart series.The series type is determined by the value of the type field.
		/// If a type value is missing, the type is assumed to be the one specified in seriesDefaults.
        /// </summary>
        /// <param name="configurator">The configurator for the series setting.</param>
        public ChartBuilder Series(Action<ChartSeriesFactory> configurator)
        {

            configurator(new ChartSeriesFactory(Container.Series)
            {
                Chart = Container
            });

            return this;
        }

        /// <summary>
        /// The default colors for the chart's series. When all colors are used, new colors are pulled from the start again.
        /// </summary>
        /// <param name="value">The value for SeriesColors</param>
        public ChartBuilder SeriesColors(params String[] value)
        {
            Container.SeriesColors = value;
            return this;
        }

        /// <summary>
        /// The chart theme.The supported values are:
        /// </summary>
        /// <param name="value">The value for Theme</param>
        public ChartBuilder Theme(string value)
        {
            Container.Theme = value;
            return this;
        }

        /// <summary>
        /// The chart title configuration options or text.
        /// </summary>
        /// <param name="configurator">The configurator for the title setting.</param>
        public ChartBuilder Title(Action<ChartTitleSettingsBuilder> configurator)
        {

            Container.Title.Chart = Container;
            configurator(new ChartTitleSettingsBuilder(Container.Title));

            return this;
        }

        /// <summary>
        /// The chart series tooltip configuration options.
        /// </summary>
        /// <param name="configurator">The configurator for the tooltip setting.</param>
        public ChartBuilder Tooltip(Action<ChartTooltipSettingsBuilder> configurator)
        {

            Container.Tooltip.Chart = Container;
            configurator(new ChartTooltipSettingsBuilder(Container.Tooltip));

            return this;
        }

        /// <summary>
        /// If set to true the chart will play animations when displaying the series. By default animations are enabled.
        /// </summary>
        /// <param name="value">The value for Transitions</param>
        public ChartBuilder Transitions(bool value)
        {
            Container.Transitions = value;
            return this;
        }

        /// <summary>
        /// The value axis configuration options.
        /// </summary>
        /// <param name="configurator">The configurator for the valueaxis setting.</param>
        public ChartBuilder ValueAxis(Action<ChartValueAxisFactory> configurator)
        {

            configurator(new ChartValueAxisFactory(Container.ValueAxis)
            {
                Chart = Container
            });

            return this;
        }

        /// <summary>
        /// The X-axis configuration options of the scatter chart X-axis. Supports all valueAxis options.
        /// </summary>
        /// <param name="configurator">The configurator for the xaxis setting.</param>
        public ChartBuilder XAxis(Action<ChartXAxisFactory> configurator)
        {

            configurator(new ChartXAxisFactory(Container.XAxis)
            {
                Chart = Container
            });

            return this;
        }

        /// <summary>
        /// The y axis configuration options of the scatter chart. Supports all valueAxis options.
        /// </summary>
        /// <param name="configurator">The configurator for the yaxis setting.</param>
        public ChartBuilder YAxis(Action<ChartYAxisFactory> configurator)
        {

            configurator(new ChartYAxisFactory(Container.YAxis)
            {
                Chart = Container
            });

            return this;
        }

        /// <summary>
        /// Gets or sets the preferred widget rendering mode.
        /// </summary>
        /// <param name="value">The value for RenderAs</param>
        public ChartBuilder RenderAs(RenderingMode value)
        {
            Container.RenderAs = value;
            return this;
        }


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Chart()
        ///       .Name("Chart")
        ///       .Events(events => events
        ///           .AxisLabelClick("onAxisLabelClick")
        ///       )
        /// )
        /// </code>
        /// </example>
        public ChartBuilder Events(Action<ChartEventBuilder> configurator)
        {
            configurator(new ChartEventBuilder(Container.Events));
            return this;
        }
        
    }
}

