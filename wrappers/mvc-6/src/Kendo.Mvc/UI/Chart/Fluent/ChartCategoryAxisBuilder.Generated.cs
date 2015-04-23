using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartCategoryAxis
    /// </summary>
    public partial class ChartCategoryAxisBuilder
        
    {
        /// <summary>
        /// The discrete categoryAxis.baseUnitStep values when
		/// either categoryAxis.baseUnit is set to "fit" or
		/// categoryAxis.baseUnitStep is set to "auto".The axis will try to divide the active period into successively larger intervals.
		/// It will start from x-second intervals, where x is picked from the autoBaseUnitSteps.seconds array.
		/// Then it will move to minutes, seconds and so on.
		/// This will continue until the number of intervals is less than
		/// maxDateGroups.
        /// </summary>
        /// <param name="configurator">The configurator for the autobaseunitsteps setting.</param>
        public ChartCategoryAxisBuilder AutoBaseUnitSteps(Action<ChartCategoryAxisAutoBaseUnitStepsSettingsBuilder> configurator)
        {

            Container.AutoBaseUnitSteps.Chart = Container.Chart;
            configurator(new ChartCategoryAxisAutoBaseUnitStepsSettingsBuilder(Container.AutoBaseUnitSteps));

            return this;
        }

        /// <summary>
        /// Category index at which the first value axis crosses this axis (when set as an object).Category indices at which the value axes cross the category axis (when set as an array).
        /// </summary>
        /// <param name="value">The value for AxisCrossingValue</param>
        public ChartCategoryAxisBuilder AxisCrossingValue(params object[] value)
        {
            Container.AxisCrossingValue = value;
            return this;
        }

        /// <summary>
        /// The background color of the axis.
        /// </summary>
        /// <param name="value">The value for Background</param>
        public ChartCategoryAxisBuilder Background(string value)
        {
            Container.Background = value;
            return this;
        }

        /// <summary>
        /// The base time interval for the date axis. The default base unit is determined automatically from the minimum difference
		/// between subsequent categories.The supported values are:Setting baseUnit to "fit" will set such base unit and categoryAxis.baseUnitStep
		/// that the total number of categories does not exceed categoryAxis.maxDateGroups.Series data is aggregated for the specified base unit using the series.aggregate function.
        /// </summary>
        /// <param name="value">The value for BaseUnit</param>
        public ChartCategoryAxisBuilder BaseUnit(string value)
        {
            Container.BaseUnit = value;
            return this;
        }

        /// <summary>
        /// The step (interval) between categories in base units. Setting it to "auto" will set the step to such value
		/// that the total number of categories does not exceed categoryAxis.maxDateGroups.This option is ignored if categoryAxis.baseUnit is set to "fit".
        /// </summary>
        /// <param name="value">The value for BaseUnitStep</param>
        public ChartCategoryAxisBuilder BaseUnitStep(int value)
        {
            Container.BaseUnitStep = value;
            return this;
        }

        /// <summary>
        /// The category names. The chart will create a category for every item of the array.
        /// </summary>
        /// <param name="value">The value for Categories</param>
        public ChartCategoryAxisBuilder Categories(params object[] value)
        {
            Container.Categories = value;
            return this;
        }

        /// <summary>
        /// The color to apply to all axis elements. Accepts a valid CSS color string, including hex and rgb. Can be overridden by categoryAxis.labels.color and
		/// categoryAxis.line.color.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartCategoryAxisBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The crosshair configuration options.
        /// </summary>
        /// <param name="configurator">The configurator for the crosshair setting.</param>
        public ChartCategoryAxisBuilder Crosshair(Action<ChartCategoryAxisCrosshairSettingsBuilder> configurator)
        {

            Container.Crosshair.Chart = Container.Chart;
            configurator(new ChartCategoryAxisCrosshairSettingsBuilder(Container.Crosshair));

            return this;
        }

        /// <summary>
        /// The data item field which contains the category name. Requires the dataSource option to be set.
        /// </summary>
        /// <param name="value">The value for Field</param>
        public ChartCategoryAxisBuilder Field(string value)
        {
            Container.Field = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will position categories and series points on major ticks. This removes the empty space before and after the series.The default value is false except for "area" and "verticalArea".
        /// </summary>
        /// <param name="value">The value for Justified</param>
        public ChartCategoryAxisBuilder Justified(bool value)
        {
            Container.Justified = value;
            return this;
        }

        /// <summary>
        /// The axis labels configuration.
        /// </summary>
        /// <param name="configurator">The configurator for the labels setting.</param>
        public ChartCategoryAxisBuilder Labels(Action<ChartCategoryAxisLabelsSettingsBuilder> configurator)
        {

            Container.Labels.Chart = Container.Chart;
            configurator(new ChartCategoryAxisLabelsSettingsBuilder(Container.Labels));

            return this;
        }

        /// <summary>
        /// The configuration of the axis lines. Also affects the major and minor ticks, but not the grid lines.
        /// </summary>
        /// <param name="configurator">The configurator for the line setting.</param>
        public ChartCategoryAxisBuilder Line(Action<ChartCategoryAxisLineSettingsBuilder> configurator)
        {

            Container.Line.Chart = Container.Chart;
            configurator(new ChartCategoryAxisLineSettingsBuilder(Container.Line));

            return this;
        }

        /// <summary>
        /// The configuration of the major grid lines. These are the lines that are an extension of the major ticks through the
		/// body of the chart.
        /// </summary>
        /// <param name="configurator">The configurator for the majorgridlines setting.</param>
        public ChartCategoryAxisBuilder MajorGridLines(Action<ChartCategoryAxisMajorGridLinesSettingsBuilder> configurator)
        {

            Container.MajorGridLines.Chart = Container.Chart;
            configurator(new ChartCategoryAxisMajorGridLinesSettingsBuilder(Container.MajorGridLines));

            return this;
        }

        /// <summary>
        /// The configuration of the category axis major ticks.
        /// </summary>
        /// <param name="configurator">The configurator for the majorticks setting.</param>
        public ChartCategoryAxisBuilder MajorTicks(Action<ChartCategoryAxisMajorTicksSettingsBuilder> configurator)
        {

            Container.MajorTicks.Chart = Container.Chart;
            configurator(new ChartCategoryAxisMajorTicksSettingsBuilder(Container.MajorTicks));

            return this;
        }

        /// <summary>
        /// The last date displayed on the category date axis. By default, the minimum date is the same as the last category.
		/// This is often used in combination with the categoryAxis.min and categoryAxis.roundToBaseUnit options to
		/// set up a fixed date range.
        /// </summary>
        /// <param name="value">The value for Max</param>
        public ChartCategoryAxisBuilder Max(object value)
        {
            Container.Max = value;
            return this;
        }

        /// <summary>
        /// The maximum number of groups (categories) to display when
		/// categoryAxis.baseUnit is set to "fit" or
		/// categoryAxis.baseUnitStep is set to "auto".
        /// </summary>
        /// <param name="value">The value for MaxDateGroups</param>
        public ChartCategoryAxisBuilder MaxDateGroups(double value)
        {
            Container.MaxDateGroups = value;
            return this;
        }

        /// <summary>
        /// The first date displayed on the category date axis. By default, the minimum date is the same as the first category.
		/// This is often used in combination with the categoryAxis.min and categoryAxis.roundToBaseUnit options to
		/// set up a fixed date range.
        /// </summary>
        /// <param name="value">The value for Min</param>
        public ChartCategoryAxisBuilder Min(object value)
        {
            Container.Min = value;
            return this;
        }

        /// <summary>
        /// The configuration of the minor grid lines. These are the lines that are an extension of the minor ticks through the
		/// body of the chart.
        /// </summary>
        /// <param name="configurator">The configurator for the minorgridlines setting.</param>
        public ChartCategoryAxisBuilder MinorGridLines(Action<ChartCategoryAxisMinorGridLinesSettingsBuilder> configurator)
        {

            Container.MinorGridLines.Chart = Container.Chart;
            configurator(new ChartCategoryAxisMinorGridLinesSettingsBuilder(Container.MinorGridLines));

            return this;
        }

        /// <summary>
        /// The configuration of the category axis minor ticks.
        /// </summary>
        /// <param name="configurator">The configurator for the minorticks setting.</param>
        public ChartCategoryAxisBuilder MinorTicks(Action<ChartCategoryAxisMinorTicksSettingsBuilder> configurator)
        {

            Container.MinorTicks.Chart = Container.Chart;
            configurator(new ChartCategoryAxisMinorTicksSettingsBuilder(Container.MinorTicks));

            return this;
        }

        /// <summary>
        /// The unique axis name. Used to associate a series with a category axis using the series.categoryAxis option.
        /// </summary>
        /// <param name="value">The value for Name</param>
        public ChartCategoryAxisBuilder Name(string value)
        {
            Container.Name = value;
            return this;
        }

        /// <summary>
        /// The name of the pane that the category axis should be rendered in.
		/// The axis will be rendered in the first (default) pane if not set.
        /// </summary>
        /// <param name="value">The value for Pane</param>
        public ChartCategoryAxisBuilder Pane(string value)
        {
            Container.Pane = value;
            return this;
        }

        /// <summary>
        /// The plot bands of the category axis.
        /// </summary>
        /// <param name="configurator">The configurator for the plotbands setting.</param>
        public ChartCategoryAxisBuilder PlotBands(Action<ChartCategoryAxisPlotBandFactory> configurator)
        {

            configurator(new ChartCategoryAxisPlotBandFactory(Container.PlotBands)
            {
                Chart = Container.Chart
            });

            return this;
        }

        /// <summary>
        /// If set to true the category axis direction will be reversed. By default categories are listed from left to right and from bottom to top.
        /// </summary>
        /// <param name="value">The value for Reverse</param>
        public ChartCategoryAxisBuilder Reverse(bool value)
        {
            Container.Reverse = value;
            return this;
        }

        /// <summary>
        /// If set to true the category axis direction will be reversed. By default categories are listed from left to right and from bottom to top.
        /// </summary>
        public ChartCategoryAxisBuilder Reverse()
        {
            Container.Reverse = true;
            return this;
        }

        /// <summary>
        /// If set to true the chart will round the first and last date to the nearest base unit.The roundToBaseUnit option will be ignored if series.type is set to "bar", "column", "boxPlot", "ohlc", "candlestick" or "waterfall".
        /// </summary>
        /// <param name="value">The value for RoundToBaseUnit</param>
        public ChartCategoryAxisBuilder RoundToBaseUnit(bool value)
        {
            Container.RoundToBaseUnit = value;
            return this;
        }

        /// <summary>
        /// The selected axis range. If set, axis selection will be enabled.The range is index based, starting from 0.
		/// Categories with indexes in the range [select.from, select.to) will be selected.
		/// That is, the last category in the range will not be included in the selection.If the categories are dates, the range must also be specified with date values.
        /// </summary>
        /// <param name="configurator">The configurator for the select setting.</param>
        public ChartCategoryAxisBuilder Select(Action<ChartCategoryAxisSelectSettingsBuilder> configurator)
        {

            Container.Select.Chart = Container.Chart;
            configurator(new ChartCategoryAxisSelectSettingsBuilder(Container.Select));

            return this;
        }

        /// <summary>
        /// The angle (degrees) of the first category on the axis.Angles increase clockwise and zero is to the left. Negative values are acceptable.
        /// </summary>
        /// <param name="value">The value for StartAngle</param>
        public ChartCategoryAxisBuilder StartAngle(double value)
        {
            Container.StartAngle = value;
            return this;
        }

        /// <summary>
        /// The title configuration of the category axis.
        /// </summary>
        /// <param name="configurator">The configurator for the title setting.</param>
        public ChartCategoryAxisBuilder Title(Action<ChartCategoryAxisTitleSettingsBuilder> configurator)
        {

            Container.Title.Chart = Container.Chart;
            configurator(new ChartCategoryAxisTitleSettingsBuilder(Container.Title));

            return this;
        }

        /// <summary>
        /// The category axis type.The supported values are:
        /// </summary>
        /// <param name="value">The value for Type</param>
        public ChartCategoryAxisBuilder Type(string value)
        {
            Container.Type = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the category axis. By default the category axis is visible.
        /// </summary>
        /// <param name="value">The value for Visible</param>
        public ChartCategoryAxisBuilder Visible(bool value)
        {
            Container.Visible = value;
            return this;
        }

        /// <summary>
        /// The week start day when categoryAxis.baseUnit is set to "weeks".The supported values are:
        /// </summary>
        /// <param name="value">The value for WeekStartDay</param>
        public ChartCategoryAxisBuilder WeekStartDay(double value)
        {
            Container.WeekStartDay = value;
            return this;
        }

        /// <summary>
        /// The category axis notes configuration.
        /// </summary>
        /// <param name="configurator">The configurator for the notes setting.</param>
        public ChartCategoryAxisBuilder Notes(Action<ChartCategoryAxisNotesSettingsBuilder> configurator)
        {

            Container.Notes.Chart = Container.Chart;
            configurator(new ChartCategoryAxisNotesSettingsBuilder(Container.Notes));

            return this;
        }

    }
}
