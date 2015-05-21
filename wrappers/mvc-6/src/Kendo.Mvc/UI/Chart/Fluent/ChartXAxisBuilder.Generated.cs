using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartXAxis
    /// </summary>
    public partial class ChartXAxisBuilder
        
    {
        /// <summary>
        /// Value at which the Y axis crosses this axis. (Only for object)Value indices at which the Y axes cross the value axis. (Only for array)Date at which the Y axis crosses this axis. (Only for date)
        /// </summary>
        /// <param name="value">The value for AxisCrossingValue</param>
        public ChartXAxisBuilder AxisCrossingValue(params object[] value)
        {
            Container.AxisCrossingValue = value;
            return this;
        }

        /// <summary>
        /// The background color of the axis.
        /// </summary>
        /// <param name="value">The value for Background</param>
        public ChartXAxisBuilder Background(string value)
        {
            Container.Background = value;
            return this;
        }

        /// <summary>
        /// The base time interval for the axis labels. The default baseUnit is determined automatically from the value range. Available options:
        /// </summary>
        /// <param name="value">The value for BaseUnit</param>
        public ChartXAxisBuilder BaseUnit(string value)
        {
            Container.BaseUnit = value;
            return this;
        }

        /// <summary>
        /// The color of the axis. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartXAxisBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The crosshair configuration options.
        /// </summary>
        /// <param name="configurator">The configurator for the crosshair setting.</param>
        public ChartXAxisBuilder Crosshair(Action<ChartXAxisCrosshairSettingsBuilder> configurator)
        {

            Container.Crosshair.Chart = Container.Chart;
            configurator(new ChartXAxisCrosshairSettingsBuilder(Container.Crosshair));

            return this;
        }

        /// <summary>
        /// The axis labels configuration.
        /// </summary>
        /// <param name="configurator">The configurator for the labels setting.</param>
        public ChartXAxisBuilder Labels(Action<ChartXAxisLabelsSettingsBuilder> configurator)
        {

            Container.Labels.Chart = Container.Chart;
            configurator(new ChartXAxisLabelsSettingsBuilder(Container.Labels));

            return this;
        }

        /// <summary>
        /// The configuration of the axis lines. Also affects the major and minor ticks, but not the grid lines.
        /// </summary>
        /// <param name="configurator">The configurator for the line setting.</param>
        public ChartXAxisBuilder Line(Action<ChartXAxisLineSettingsBuilder> configurator)
        {

            Container.Line.Chart = Container.Chart;
            configurator(new ChartXAxisLineSettingsBuilder(Container.Line));

            return this;
        }

        /// <summary>
        /// The configuration of the major grid lines. These are the lines that are an extension of the major ticks through the
		/// body of the chart.
        /// </summary>
        /// <param name="configurator">The configurator for the majorgridlines setting.</param>
        public ChartXAxisBuilder MajorGridLines(Action<ChartXAxisMajorGridLinesSettingsBuilder> configurator)
        {

            Container.MajorGridLines.Chart = Container.Chart;
            configurator(new ChartXAxisMajorGridLinesSettingsBuilder(Container.MajorGridLines));

            return this;
        }

        /// <summary>
        /// The configuration of the minor grid lines. These are the lines that are an extension of the minor ticks through the
		/// body of the chart.
        /// </summary>
        /// <param name="configurator">The configurator for the minorgridlines setting.</param>
        public ChartXAxisBuilder MinorGridLines(Action<ChartXAxisMinorGridLinesSettingsBuilder> configurator)
        {

            Container.MinorGridLines.Chart = Container.Chart;
            configurator(new ChartXAxisMinorGridLinesSettingsBuilder(Container.MinorGridLines));

            return this;
        }

        /// <summary>
        /// The configuration of the x axis minor ticks.
        /// </summary>
        /// <param name="configurator">The configurator for the minorticks setting.</param>
        public ChartXAxisBuilder MinorTicks(Action<ChartXAxisMinorTicksSettingsBuilder> configurator)
        {

            Container.MinorTicks.Chart = Container.Chart;
            configurator(new ChartXAxisMinorTicksSettingsBuilder(Container.MinorTicks));

            return this;
        }

        /// <summary>
        /// The configuration of the scatter chart x axis major ticks.
        /// </summary>
        /// <param name="configurator">The configurator for the majorticks setting.</param>
        public ChartXAxisBuilder MajorTicks(Action<ChartXAxisMajorTicksSettingsBuilder> configurator)
        {

            Container.MajorTicks.Chart = Container.Chart;
            configurator(new ChartXAxisMajorTicksSettingsBuilder(Container.MajorTicks));

            return this;
        }

        /// <summary>
        /// The interval between major divisions.
		/// If this is a date axis the value represents the number of xAxis.baseUnits between major divisions.
		/// If the xAxis.type is set to "log", the majorUnit value will be used for the base of the logarithm.
        /// </summary>
        /// <param name="value">The value for MajorUnit</param>
        public ChartXAxisBuilder MajorUnit(double value)
        {
            Container.MajorUnit = value;
            return this;
        }

        /// <summary>
        /// The maximum value of the axis.
        /// </summary>
        /// <param name="value">The value for Max</param>
        public ChartXAxisBuilder Max(object value)
        {
            Container.Max = value;
            return this;
        }

        /// <summary>
        /// The minimum value of the axis.
        /// </summary>
        /// <param name="value">The value for Min</param>
        public ChartXAxisBuilder Min(object value)
        {
            Container.Min = value;
            return this;
        }

        /// <summary>
        /// The interval between minor divisions. It defaults to 1/5th of the xAxis.majorUnit.
		/// If the xAxis.type is set to "log", the minorUnit value represents the number of divisions between two major units and defaults to the major unit minus one.
        /// </summary>
        /// <param name="value">The value for MinorUnit</param>
        public ChartXAxisBuilder MinorUnit(double value)
        {
            Container.MinorUnit = value;
            return this;
        }

        /// <summary>
        /// The unique axis name. Used to associate a series with a x axis using the series.xAxis option.
        /// </summary>
        /// <param name="value">The value for Name</param>
        public ChartXAxisBuilder Name(string value)
        {
            Container.Name = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will prevent the automatic axis range from snapping to 0.
		/// Setting it to false will force the automatic axis range to snap to 0.
        /// </summary>
        /// <param name="value">The value for NarrowRange</param>
        public ChartXAxisBuilder NarrowRange(bool value)
        {
            Container.NarrowRange = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will prevent the automatic axis range from snapping to 0.
		/// Setting it to false will force the automatic axis range to snap to 0.
        /// </summary>
        public ChartXAxisBuilder NarrowRange()
        {
            Container.NarrowRange = true;
            return this;
        }

        /// <summary>
        /// The name of the pane that the axis should be rendered in.
		/// The axis will be rendered in the first (default) pane if not set.
        /// </summary>
        /// <param name="value">The value for Pane</param>
        public ChartXAxisBuilder Pane(string value)
        {
            Container.Pane = value;
            return this;
        }

        /// <summary>
        /// The plot bands of the x axis.
        /// </summary>
        /// <param name="configurator">The configurator for the plotbands setting.</param>
        public ChartXAxisBuilder PlotBands(Action<ChartXAxisPlotBandFactory> configurator)
        {

            configurator(new ChartXAxisPlotBandFactory(Container.PlotBands)
            {
                Chart = Container.Chart
            });

            return this;
        }

        /// <summary>
        /// If set to true the value axis direction will be reversed. By default values increase from left to right and from bottom to top.
        /// </summary>
        /// <param name="value">The value for Reverse</param>
        public ChartXAxisBuilder Reverse(bool value)
        {
            Container.Reverse = value;
            return this;
        }

        /// <summary>
        /// If set to true the value axis direction will be reversed. By default values increase from left to right and from bottom to top.
        /// </summary>
        public ChartXAxisBuilder Reverse()
        {
            Container.Reverse = true;
            return this;
        }

        /// <summary>
        /// The angle (degrees) where the 0 value is placed.Angles increase counterclockwise and zero is to the right. Negative values are acceptable.
        /// </summary>
        /// <param name="value">The value for StartAngle</param>
        public ChartXAxisBuilder StartAngle(double value)
        {
            Container.StartAngle = value;
            return this;
        }

        /// <summary>
        /// The title configuration of the scatter chart x axis.
        /// </summary>
        /// <param name="configurator">The configurator for the title setting.</param>
        public ChartXAxisBuilder Title(Action<ChartXAxisTitleSettingsBuilder> configurator)
        {

            Container.Title.Chart = Container.Chart;
            configurator(new ChartXAxisTitleSettingsBuilder(Container.Title));

            return this;
        }

        /// <summary>
        /// The axis type.The supported values are:
        /// </summary>
        /// <param name="value">The value for Type</param>
        public ChartXAxisBuilder Type(string value)
        {
            Container.Type = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the x axis. By default the x axis is visible.
        /// </summary>
        /// <param name="value">The value for Visible</param>
        public ChartXAxisBuilder Visible(bool value)
        {
            Container.Visible = value;
            return this;
        }

        /// <summary>
        /// The x axis notes configuration.
        /// </summary>
        /// <param name="configurator">The configurator for the notes setting.</param>
        public ChartXAxisBuilder Notes(Action<ChartXAxisNotesSettingsBuilder> configurator)
        {

            Container.Notes.Chart = Container.Chart;
            configurator(new ChartXAxisNotesSettingsBuilder(Container.Notes));

            return this;
        }

    }
}
