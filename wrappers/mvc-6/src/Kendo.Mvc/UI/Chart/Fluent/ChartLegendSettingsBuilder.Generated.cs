using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartLegendSettings
    /// </summary>
    public partial class ChartLegendSettingsBuilder
        
    {
        /// <summary>
        /// The legend horizontal alignment when the legend.position is "top" or "bottom" and the vertical alignment when the legend.position is "left" or "right".The supported values are:
        /// </summary>
        /// <param name="value">The value for Align</param>
        public ChartLegendSettingsBuilder Align(string value)
        {
            Container.Align = value;
            return this;
        }

        /// <summary>
        /// The background color of the legend. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Background</param>
        public ChartLegendSettingsBuilder Background(string value)
        {
            Container.Background = value;
            return this;
        }

        /// <summary>
        /// The border of the legend.
        /// </summary>
        /// <param name="configurator">The configurator for the border setting.</param>
        public ChartLegendSettingsBuilder Border(Action<ChartLegendBorderSettingsBuilder> configurator)
        {

            Container.Border.Chart = Container.Chart;
            configurator(new ChartLegendBorderSettingsBuilder(Container.Border));

            return this;
        }

        /// <summary>
        /// The legend height when the legend.orientation is set to "vertical".
        /// </summary>
        /// <param name="value">The value for Height</param>
        public ChartLegendSettingsBuilder Height(double value)
        {
            Container.Height = value;
            return this;
        }

        /// <summary>
        /// The chart inactive legend items configuration.
        /// </summary>
        /// <param name="configurator">The configurator for the inactiveitems setting.</param>
        public ChartLegendSettingsBuilder InactiveItems(Action<ChartLegendInactiveItemsSettingsBuilder> configurator)
        {

            Container.InactiveItems.Chart = Container.Chart;
            configurator(new ChartLegendInactiveItemsSettingsBuilder(Container.InactiveItems));

            return this;
        }

        /// <summary>
        /// The chart legend item configuration.
        /// </summary>
        /// <param name="configurator">The configurator for the item setting.</param>
        public ChartLegendSettingsBuilder Item(Action<ChartLegendItemSettingsBuilder> configurator)
        {

            Container.Item.Chart = Container.Chart;
            configurator(new ChartLegendItemSettingsBuilder(Container.Item));

            return this;
        }

        /// <summary>
        /// The chart legend label configuration.
        /// </summary>
        /// <param name="configurator">The configurator for the labels setting.</param>
        public ChartLegendSettingsBuilder Labels(Action<ChartLegendLabelsSettingsBuilder> configurator)
        {

            Container.Labels.Chart = Container.Chart;
            configurator(new ChartLegendLabelsSettingsBuilder(Container.Labels));

            return this;
        }

        /// <summary>
        /// The margin of the chart legend. A numeric value will set all paddings.
        /// </summary>
        /// <param name="configurator">The configurator for the margin setting.</param>
        public ChartLegendSettingsBuilder Margin(Action<ChartLegendMarginSettingsBuilder> configurator)
        {

            Container.Margin.Chart = Container.Chart;
            configurator(new ChartLegendMarginSettingsBuilder(Container.Margin));

            return this;
        }

        /// <summary>
        /// The X offset of the chart legend. The offset is relative to the default position of the legend.
		/// For instance, a value of 20 will move the legend 20 pixels to the right of its initial position.
		/// A negative value will move the legend to the left of its current position.
        /// </summary>
        /// <param name="value">The value for OffsetX</param>
        public ChartLegendSettingsBuilder OffsetX(double value)
        {
            Container.OffsetX = value;
            return this;
        }

        /// <summary>
        /// The Y offset of the chart legend.  The offset is relative to the current position of the legend.
		/// For instance, a value of 20 will move the legend 20 pixels down from its initial position.
		/// A negative value will move the legend upwards from its current position.
        /// </summary>
        /// <param name="value">The value for OffsetY</param>
        public ChartLegendSettingsBuilder OffsetY(double value)
        {
            Container.OffsetY = value;
            return this;
        }

        /// <summary>
        /// The orientation of the legend items.The supported values are:
        /// </summary>
        /// <param name="value">The value for Orientation</param>
        public ChartLegendSettingsBuilder Orientation(string value)
        {
            Container.Orientation = value;
            return this;
        }

        /// <summary>
        /// The padding of the chart legend. A numeric value will set all paddings.
        /// </summary>
        /// <param name="configurator">The configurator for the padding setting.</param>
        public ChartLegendSettingsBuilder Padding(Action<ChartLegendPaddingSettingsBuilder> configurator)
        {

            Container.Padding.Chart = Container.Chart;
            configurator(new ChartLegendPaddingSettingsBuilder(Container.Padding));

            return this;
        }

        /// <summary>
        /// The positions of the chart legend.The supported values are:
        /// </summary>
        /// <param name="value">The value for Position</param>
        public ChartLegendSettingsBuilder Position(string value)
        {
            Container.Position = value;
            return this;
        }

        /// <summary>
        /// If set to true the legend items will be reversed.Available in versions 2013.3.1306 and later.
        /// </summary>
        /// <param name="value">The value for Reverse</param>
        public ChartLegendSettingsBuilder Reverse(bool value)
        {
            Container.Reverse = value;
            return this;
        }

        /// <summary>
        /// If set to true the legend items will be reversed.Available in versions 2013.3.1306 and later.
        /// </summary>
        public ChartLegendSettingsBuilder Reverse()
        {
            Container.Reverse = true;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the legend. By default the chart legend is visible.
        /// </summary>
        /// <param name="value">The value for Visible</param>
        public ChartLegendSettingsBuilder Visible(bool value)
        {
            Container.Visible = value;
            return this;
        }

        /// <summary>
        /// The legend width when the legend.orientation is set to "horizontal".
        /// </summary>
        /// <param name="value">The value for Width</param>
        public ChartLegendSettingsBuilder Width(double value)
        {
            Container.Width = value;
            return this;
        }

    }
}
