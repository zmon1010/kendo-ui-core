using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerie
    /// </summary>
    public partial class ChartSerieBuilder
        
    {
        /// <summary>
        /// The aggregate function to apply for date series.This function is used when a category (an year, month, etc.) contains two or more points.
		/// The function return value is displayed instead of the individual points.The supported values are:
        /// </summary>
        /// <param name="value">The value for Aggregate</param>
        public ChartSerieBuilder Aggregate(string value)
        {
            Container.Aggregate = value;
            return this;
        }

        /// <summary>
        /// The name of the value axis to use.
        /// </summary>
        /// <param name="value">The value for Axis</param>
        public ChartSerieBuilder Axis(string value)
        {
            Container.Axis = value;
            return this;
        }

        /// <summary>
        /// The border of the chart series.
        /// </summary>
        /// <param name="configurator">The configurator for the border setting.</param>
        public ChartSerieBuilder Border(Action<ChartSerieBorderSettingsBuilder> configurator)
        {

            Container.Border.Chart = Container.Chart;
            configurator(new ChartSerieBorderSettingsBuilder(Container.Border));

            return this;
        }

        /// <summary>
        /// The data item field which contains the category name or date.
        /// </summary>
        /// <param name="value">The value for CategoryField</param>
        public ChartSerieBuilder CategoryField(string value)
        {
            Container.CategoryField = value;
            return this;
        }

        /// <summary>
        /// The data field containing the close value.
        /// </summary>
        /// <param name="value">The value for CloseField</param>
        public ChartSerieBuilder CloseField(string value)
        {
            Container.CloseField = value;
            return this;
        }

        /// <summary>
        /// The series base color. The supported values are:
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartSerieBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The data item field which contains the series color.
        /// </summary>
        /// <param name="value">The value for ColorField</param>
        public ChartSerieBuilder ColorField(string value)
        {
            Container.ColorField = value;
            return this;
        }

        /// <summary>
        /// The label connectors options.
        /// </summary>
        /// <param name="configurator">The configurator for the connectors setting.</param>
        public ChartSerieBuilder Connectors(Action<ChartSerieConnectorsSettingsBuilder> configurator)
        {

            Container.Connectors.Chart = Container.Chart;
            configurator(new ChartSerieConnectorsSettingsBuilder(Container.Connectors));

            return this;
        }

        /// <summary>
        /// The data item field containing the current value.
        /// </summary>
        /// <param name="value">The value for CurrentField</param>
        public ChartSerieBuilder CurrentField(string value)
        {
            Container.CurrentField = value;
            return this;
        }

        /// <summary>
        /// The dash type of line chart.The following dash types are supported:
        /// </summary>
        /// <param name="value">The value for DashType</param>
        public ChartSerieBuilder DashType(string value)
        {
            Container.DashType = value;
            return this;
        }

        /// <summary>
        /// The series color when the open value is greater than the close value.
        /// </summary>
        /// <param name="value">The value for DownColor</param>
        public ChartSerieBuilder DownColor(string value)
        {
            Container.DownColor = value;
            return this;
        }

        /// <summary>
        /// The data field containing the color applied when the open value is greater than the close value.
        /// </summary>
        /// <param name="value">The value for DownColorField</param>
        public ChartSerieBuilder DownColorField(string value)
        {
            Container.DownColorField = value;
            return this;
        }

        /// <summary>
        /// The space in pixels between the different segments of the funnel chart.
        /// </summary>
        /// <param name="value">The value for SegmentSpacing</param>
        public ChartSerieBuilder SegmentSpacing(double value)
        {
            Container.SegmentSpacing = value;
            return this;
        }

        /// <summary>
        /// The data item field which contains the summary type for waterfall series.
		/// Summary columns are optional and can be one of two types:
        /// </summary>
        /// <param name="value">The value for SummaryField</param>
        public ChartSerieBuilder SummaryField(string value)
        {
            Container.SummaryField = value;
            return this;
        }

        /// <summary>
        /// specifies the ratio top-base/bottom-base of the whole chart. neckRatio set to three means the top base is three times smaller than the bottom base.
        /// </summary>
        /// <param name="value">The value for NeckRatio</param>
        public ChartSerieBuilder NeckRatio(double value)
        {
            Container.NeckRatio = value;
            return this;
        }

        /// <summary>
        /// When set to true the ratio of the bases of each segment is calculated based on the ratio of currentDataItem.value/nextDataItem.value
		/// The last element is always created like a rectangle since there is no following element.
        /// </summary>
        /// <param name="value">The value for DynamicSlope</param>
        public ChartSerieBuilder DynamicSlope(bool value)
        {
            Container.DynamicSlope = value;
            return this;
        }

        /// <summary>
        /// When set to true the ratio of the bases of each segment is calculated based on the ratio of currentDataItem.value/nextDataItem.value
		/// The last element is always created like a rectangle since there is no following element.
        /// </summary>
        public ChartSerieBuilder DynamicSlope()
        {
            Container.DynamicSlope = true;
            return this;
        }

        /// <summary>
        /// When set to false all segments become with the same height, otherwise the height of each segment is based on its value.
        /// </summary>
        /// <param name="value">The value for DynamicHeight</param>
        public ChartSerieBuilder DynamicHeight(bool value)
        {
            Container.DynamicHeight = value;
            return this;
        }

        /// <summary>
        /// The error bars of the chart series.
        /// </summary>
        /// <param name="configurator">The configurator for the errorbars setting.</param>
        public ChartSerieBuilder ErrorBars(Action<ChartSerieErrorBarsSettingsBuilder> configurator)
        {

            Container.ErrorBars.Chart = Container.Chart;
            configurator(new ChartSerieErrorBarsSettingsBuilder(Container.ErrorBars));

            return this;
        }

        /// <summary>
        /// The data item field which contains the series.errorBars low value.
        /// </summary>
        /// <param name="value">The value for ErrorLowField</param>
        public ChartSerieBuilder ErrorLowField(string value)
        {
            Container.ErrorLowField = value;
            return this;
        }

        /// <summary>
        /// The data item field which contains the series.errorBars high value.
        /// </summary>
        /// <param name="value">The value for ErrorHighField</param>
        public ChartSerieBuilder ErrorHighField(string value)
        {
            Container.ErrorHighField = value;
            return this;
        }

        /// <summary>
        /// The data item field which contains the series.errorBars xAxis low value.
        /// </summary>
        /// <param name="value">The value for XErrorLowField</param>
        public ChartSerieBuilder XErrorLowField(string value)
        {
            Container.XErrorLowField = value;
            return this;
        }

        /// <summary>
        /// The data item field which contains the series.errorBars xAxis high value.
        /// </summary>
        /// <param name="value">The value for XErrorHighField</param>
        public ChartSerieBuilder XErrorHighField(string value)
        {
            Container.XErrorHighField = value;
            return this;
        }

        /// <summary>
        /// The data item field which contains the series.errorBars yAxis low value.
        /// </summary>
        /// <param name="value">The value for YErrorLowField</param>
        public ChartSerieBuilder YErrorLowField(string value)
        {
            Container.YErrorLowField = value;
            return this;
        }

        /// <summary>
        /// The data item field which contains the series.errorBars yAxis high value.
        /// </summary>
        /// <param name="value">The value for YErrorHighField</param>
        public ChartSerieBuilder YErrorHighField(string value)
        {
            Container.YErrorHighField = value;
            return this;
        }

        /// <summary>
        /// The data item field which contains a boolean value indicating whether the sector is exploded.
        /// </summary>
        /// <param name="value">The value for ExplodeField</param>
        public ChartSerieBuilder ExplodeField(string value)
        {
            Container.ExplodeField = value;
            return this;
        }

        /// <summary>
        /// The data item field which contains the series value.
        /// </summary>
        /// <param name="value">The value for Field</param>
        public ChartSerieBuilder Field(string value)
        {
            Container.Field = value;
            return this;
        }

        /// <summary>
        /// The data item field which contains the series from value.
        /// </summary>
        /// <param name="value">The value for FromField</param>
        public ChartSerieBuilder FromField(string value)
        {
            Container.FromField = value;
            return this;
        }

        /// <summary>
        /// The data item field which contains the series to value.
        /// </summary>
        /// <param name="value">The value for ToField</param>
        public ChartSerieBuilder ToField(string value)
        {
            Container.ToField = value;
            return this;
        }

        /// <summary>
        /// The data item field which contains the series note text.
        /// </summary>
        /// <param name="value">The value for NoteTextField</param>
        public ChartSerieBuilder NoteTextField(string value)
        {
            Container.NoteTextField = value;
            return this;
        }

        /// <summary>
        /// The data item field which contains the series lower value.
        /// </summary>
        /// <param name="value">The value for LowerField</param>
        public ChartSerieBuilder LowerField(string value)
        {
            Container.LowerField = value;
            return this;
        }

        /// <summary>
        /// The data item field which contains the series q1 value.
        /// </summary>
        /// <param name="value">The value for Q1Field</param>
        public ChartSerieBuilder Q1Field(string value)
        {
            Container.Q1Field = value;
            return this;
        }

        /// <summary>
        /// The data item field which contains the series median value.
        /// </summary>
        /// <param name="value">The value for MedianField</param>
        public ChartSerieBuilder MedianField(string value)
        {
            Container.MedianField = value;
            return this;
        }

        /// <summary>
        /// The data item field which contains the series q3 value.
        /// </summary>
        /// <param name="value">The value for Q3Field</param>
        public ChartSerieBuilder Q3Field(string value)
        {
            Container.Q3Field = value;
            return this;
        }

        /// <summary>
        /// The data item field which contains the series upper value.
        /// </summary>
        /// <param name="value">The value for UpperField</param>
        public ChartSerieBuilder UpperField(string value)
        {
            Container.UpperField = value;
            return this;
        }

        /// <summary>
        /// The data item field which contains the series mean value.
        /// </summary>
        /// <param name="value">The value for MeanField</param>
        public ChartSerieBuilder MeanField(string value)
        {
            Container.MeanField = value;
            return this;
        }

        /// <summary>
        /// The data item field which contains the series outliers value.
        /// </summary>
        /// <param name="value">The value for OutliersField</param>
        public ChartSerieBuilder OutliersField(string value)
        {
            Container.OutliersField = value;
            return this;
        }

        /// <summary>
        /// The distance between categories expressed as a percentage of the bar width.See the related spacing setting.
        /// </summary>
        /// <param name="value">The value for Gap</param>
        public ChartSerieBuilder Gap(double value)
        {
            Container.Gap = value;
            return this;
        }

        /// <summary>
        /// The data field containing the high value.
        /// </summary>
        /// <param name="value">The value for HighField</param>
        public ChartSerieBuilder HighField(string value)
        {
            Container.HighField = value;
            return this;
        }

        /// <summary>
        /// The chart series highlighting configuration options.
        /// </summary>
        /// <param name="configurator">The configurator for the highlight setting.</param>
        public ChartSerieBuilder Highlight(Action<ChartSerieHighlightSettingsBuilder> configurator)
        {

            Container.Highlight.Chart = Container.Chart;
            configurator(new ChartSerieHighlightSettingsBuilder(Container.Highlight));

            return this;
        }

        /// <summary>
        /// The diameter of the donut hole in pixels.
        /// </summary>
        /// <param name="value">The value for HoleSize</param>
        public ChartSerieBuilder HoleSize(double value)
        {
            Container.HoleSize = value;
            return this;
        }

        /// <summary>
        /// The chart series label configuration.
        /// </summary>
        /// <param name="configurator">The configurator for the labels setting.</param>
        public ChartSerieBuilder Labels(Action<ChartSerieLabelsSettingsBuilder> configurator)
        {

            Container.Labels.Chart = Container.Chart;
            configurator(new ChartSerieLabelsSettingsBuilder(Container.Labels));

            return this;
        }

        /// <summary>
        /// The chart line configuration options.
        /// </summary>
        /// <param name="configurator">The configurator for the line setting.</param>
        public ChartSerieBuilder Line(Action<ChartSerieLineSettingsBuilder> configurator)
        {

            Container.Line.Chart = Container.Chart;
            configurator(new ChartSerieLineSettingsBuilder(Container.Line));

            return this;
        }

        /// <summary>
        /// The data field containing the low value.
        /// </summary>
        /// <param name="value">The value for LowField</param>
        public ChartSerieBuilder LowField(string value)
        {
            Container.LowField = value;
            return this;
        }

        /// <summary>
        /// The margin around each donut series (ring). A numeric value will set all margins.
        /// </summary>
        /// <param name="configurator">The configurator for the margin setting.</param>
        public ChartSerieBuilder Margin(Action<ChartSerieMarginSettingsBuilder> configurator)
        {

            Container.Margin.Chart = Container.Chart;
            configurator(new ChartSerieMarginSettingsBuilder(Container.Margin));

            return this;
        }

        /// <summary>
        /// The chart series marker configuration.
        /// </summary>
        /// <param name="configurator">The configurator for the markers setting.</param>
        public ChartSerieBuilder Markers(Action<ChartSerieMarkersSettingsBuilder> configurator)
        {

            Container.Markers.Chart = Container.Chart;
            configurator(new ChartSerieMarkersSettingsBuilder(Container.Markers));

            return this;
        }

        /// <summary>
        /// The chart series outliers configuration.
        /// </summary>
        /// <param name="configurator">The configurator for the outliers setting.</param>
        public ChartSerieBuilder Outliers(Action<ChartSerieOutliersSettingsBuilder> configurator)
        {

            Container.Outliers.Chart = Container.Chart;
            configurator(new ChartSerieOutliersSettingsBuilder(Container.Outliers));

            return this;
        }

        /// <summary>
        /// The chart series extremes configuration.
        /// </summary>
        /// <param name="configurator">The configurator for the extremes setting.</param>
        public ChartSerieBuilder Extremes(Action<ChartSerieExtremesSettingsBuilder> configurator)
        {

            Container.Extremes.Chart = Container.Chart;
            configurator(new ChartSerieExtremesSettingsBuilder(Container.Extremes));

            return this;
        }

        /// <summary>
        /// The maximum size of the chart bubble series marker.
        /// </summary>
        /// <param name="value">The value for MaxSize</param>
        public ChartSerieBuilder MaxSize(double value)
        {
            Container.MaxSize = value;
            return this;
        }

        /// <summary>
        /// The minimum size of the chart bubble series marker.
        /// </summary>
        /// <param name="value">The value for MinSize</param>
        public ChartSerieBuilder MinSize(double value)
        {
            Container.MinSize = value;
            return this;
        }

        /// <summary>
        /// The behavior for handling missing values. The supported values are:
        /// </summary>
        /// <param name="value">The value for MissingValues</param>
        public ChartSerieBuilder MissingValues(string value)
        {
            Container.MissingValues = value;
            return this;
        }

        /// <summary>
        /// The supported values are:
        /// </summary>
        /// <param name="value">The value for Style</param>
        public ChartSerieBuilder Style(string value)
        {
            Container.Style = value;
            return this;
        }

        /// <summary>
        /// The name of the chart series which is visible in the legend.
        /// </summary>
        /// <param name="value">The value for Name</param>
        public ChartSerieBuilder Name(string value)
        {
            Container.Name = value;
            return this;
        }

        /// <summary>
        /// The color to use for bar, column or waterfall series with negative values. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for NegativeColor</param>
        public ChartSerieBuilder NegativeColor(string value)
        {
            Container.NegativeColor = value;
            return this;
        }

        /// <summary>
        /// The options for displaying the chart negative bubble values.
        /// </summary>
        /// <param name="configurator">The configurator for the negativevalues setting.</param>
        public ChartSerieBuilder NegativeValues(Action<ChartSerieNegativeValuesSettingsBuilder> configurator)
        {

            Container.NegativeValues.Chart = Container.Chart;
            configurator(new ChartSerieNegativeValuesSettingsBuilder(Container.NegativeValues));

            return this;
        }

        /// <summary>
        /// The series opacity. By default the series are opaque.
        /// </summary>
        /// <param name="value">The value for Opacity</param>
        public ChartSerieBuilder Opacity(double value)
        {
            Container.Opacity = value;
            return this;
        }

        /// <summary>
        /// The data field containing the open value.
        /// </summary>
        /// <param name="value">The value for OpenField</param>
        public ChartSerieBuilder OpenField(string value)
        {
            Container.OpenField = value;
            return this;
        }

        /// <summary>
        /// The chart series overlay options.
        /// </summary>
        /// <param name="configurator">The configurator for the overlay setting.</param>
        public ChartSerieBuilder Overlay(Action<ChartSerieOverlaySettingsBuilder> configurator)
        {

            Container.Overlay.Chart = Container.Chart;
            configurator(new ChartSerieOverlaySettingsBuilder(Container.Overlay));

            return this;
        }

        /// <summary>
        /// The padding around the chart (equal on all sides).
        /// </summary>
        /// <param name="value">The value for Padding</param>
        public ChartSerieBuilder Padding(double value)
        {
            Container.Padding = value;
            return this;
        }

        /// <summary>
        /// The or radius of the chart donut series in pixels. If not set, the available space is split evenly between the series.
        /// </summary>
        /// <param name="value">The value for Size</param>
        public ChartSerieBuilder Size(double value)
        {
            Container.Size = value;
            return this;
        }

        /// <summary>
        /// The data field containing the bubble size value.
        /// </summary>
        /// <param name="value">The value for SizeField</param>
        public ChartSerieBuilder SizeField(string value)
        {
            Container.SizeField = value;
            return this;
        }

        /// <summary>
        /// The distance between series points within a category. Expressed as a percentage of the bar width.See the related gap setting.
        /// </summary>
        /// <param name="value">The value for Spacing</param>
        public ChartSerieBuilder Spacing(double value)
        {
            Container.Spacing = value;
            return this;
        }

        /// <summary>
        /// A boolean value indicating if the series should be stacked.
		/// A string value is interpreted as series.stack.group.
        /// </summary>
        /// <param name="configurator">The configurator for the stack setting.</param>
        public ChartSerieBuilder Stack(Action<ChartSerieStackSettingsBuilder> configurator)
        {
            Container.Stack.Enabled = true;

            Container.Stack.Chart = Container.Chart;
            configurator(new ChartSerieStackSettingsBuilder(Container.Stack));

            return this;
        }

        /// <summary>
        /// A boolean value indicating if the series should be stacked.
		/// A string value is interpreted as series.stack.group.
        /// </summary>
        public ChartSerieBuilder Stack()
        {
            Container.Stack.Enabled = true;
            return this;
        }

        /// <summary>
        /// A boolean value indicating if the series should be stacked.
		/// A string value is interpreted as series.stack.group.
        /// </summary>
        /// <param name="enabled">Enables or disables the stack option.</param>
        public ChartSerieBuilder Stack(bool enabled)
        {
            Container.Stack.Enabled = enabled;
            return this;
        }

        /// <summary>
        /// The start angle (degrees) of the first donut or pie segment.Angles increase clockwise and zero is to the left. Negative values are acceptable.
        /// </summary>
        /// <param name="value">The value for StartAngle</param>
        public ChartSerieBuilder StartAngle(double value)
        {
            Container.StartAngle = value;
            return this;
        }

        /// <summary>
        /// The configuration options of the target
        /// </summary>
        /// <param name="configurator">The configurator for the target setting.</param>
        public ChartSerieBuilder Target(Action<ChartSerieTargetSettingsBuilder> configurator)
        {

            Container.Target.Chart = Container.Chart;
            configurator(new ChartSerieTargetSettingsBuilder(Container.Target));

            return this;
        }

        /// <summary>
        /// The data item field containing the target value.
        /// </summary>
        /// <param name="value">The value for TargetField</param>
        public ChartSerieBuilder TargetField(string value)
        {
            Container.TargetField = value;
            return this;
        }

        /// <summary>
        /// The chart series tooltip configuration options.
        /// </summary>
        /// <param name="configurator">The configurator for the tooltip setting.</param>
        public ChartSerieBuilder Tooltip(Action<ChartSerieTooltipSettingsBuilder> configurator)
        {

            Container.Tooltip.Chart = Container.Chart;
            configurator(new ChartSerieTooltipSettingsBuilder(Container.Tooltip));

            return this;
        }

        /// <summary>
        /// The type of the series.The supported values are:
        /// </summary>
        /// <param name="value">The value for Type</param>
        public ChartSerieBuilder Type(string value)
        {
            Container.Type = value;
            return this;
        }

        /// <summary>
        /// Sets the visible property of a chart series
        /// </summary>
        /// <param name="value">The value for Visible</param>
        public ChartSerieBuilder Visible(bool value)
        {
            Container.Visible = value;
            return this;
        }

        /// <summary>
        /// A value indicating whether to show the point category name (for bubble, donut and pie series)
		/// or series name (for other available series types) in the legend.
        /// </summary>
        /// <param name="value">The value for VisibleInLegend</param>
        public ChartSerieBuilder VisibleInLegend(bool value)
        {
            Container.VisibleInLegend = value;
            return this;
        }

        /// <summary>
        /// The data item field which indicates whether to show the point category name in the legend.
        /// </summary>
        /// <param name="value">The value for VisibleInLegendField</param>
        public ChartSerieBuilder VisibleInLegendField(string value)
        {
            Container.VisibleInLegendField = value;
            return this;
        }

        /// <summary>
        /// A function that can be used to create a custom visual for the points. Applicable for bar, column, rangeBar, rangeColumn and waterfall series. The available argument fields are:
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will be evaluated.</param>
        public ChartSerieBuilder Visual(string handler)
        {
            Container.Visual = new ClientHandlerDescriptor { HandlerName = handler };
            return this;
        }

        /// <summary>
        /// A function that can be used to create a custom visual for the points. Applicable for bar, column, rangeBar, rangeColumn and waterfall series. The available argument fields are:
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ChartSerieBuilder Visual(Func<object, object> handler)
        {
            Container.Visual = new ClientHandlerDescriptor { TemplateDelegate = handler };
            return this;
        }
        /// <summary>
        /// The line width.
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartSerieBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

        /// <summary>
        /// The name of the X axis to use.For polar series the xAxis range is expressed in degrees.
        /// </summary>
        /// <param name="value">The value for XAxis</param>
        public ChartSerieBuilder XAxis(string value)
        {
            Container.XAxis = value;
            return this;
        }

        /// <summary>
        /// The data item field containing the X value.
        /// </summary>
        /// <param name="value">The value for XField</param>
        public ChartSerieBuilder XField(string value)
        {
            Container.XField = value;
            return this;
        }

        /// <summary>
        /// The name of the Y axis to use.** Available for bubble, scatter, scatterLine and polar series. **
        /// </summary>
        /// <param name="value">The value for YAxis</param>
        public ChartSerieBuilder YAxis(string value)
        {
            Container.YAxis = value;
            return this;
        }

        /// <summary>
        /// The data item field containing the Y value.
        /// </summary>
        /// <param name="value">The value for YField</param>
        public ChartSerieBuilder YField(string value)
        {
            Container.YField = value;
            return this;
        }

        /// <summary>
        /// The series notes configuration.
        /// </summary>
        /// <param name="configurator">The configurator for the notes setting.</param>
        public ChartSerieBuilder Notes(Action<ChartSerieNotesSettingsBuilder> configurator)
        {

            Container.Notes.Chart = Container.Chart;
            configurator(new ChartSerieNotesSettingsBuilder(Container.Notes));

            return this;
        }

        /// <summary>
        /// An optional Z-index that can be used to change the default stacking order of series.The series with the highest Z-index will be placed on top.Series with no Z-index will use the default stacking order based on series type.
		/// For example line series will be on top with bar and area following below.
        /// </summary>
        /// <param name="value">The value for ZIndex</param>
        public ChartSerieBuilder ZIndex(double value)
        {
            Container.ZIndex = value;
            return this;
        }

    }
}
