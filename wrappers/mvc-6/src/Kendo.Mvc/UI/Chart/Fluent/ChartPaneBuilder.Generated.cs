using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartPane
    /// </summary>
    public partial class ChartPaneBuilder
        
    {
        /// <summary>
        /// The background color of the chart pane. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Background</param>
        public ChartPaneBuilder Background(string value)
        {
            Container.Background = value;
            return this;
        }

        /// <summary>
        /// The border of the chart pane.
        /// </summary>
        /// <param name="configurator">The configurator for the border setting.</param>
        public ChartPaneBuilder Border(Action<ChartPaneBorderSettingsBuilder> configurator)
        {

            Container.Border.Chart = Container.Chart;
            configurator(new ChartPaneBorderSettingsBuilder(Container.Border));

            return this;
        }

        /// <summary>
        /// Specifies whether the charts in the pane should be clipped. By default all charts except radar, polar and 100% stacked charts are clipped.
        /// </summary>
        /// <param name="value">The value for Clip</param>
        public ChartPaneBuilder Clip(bool value)
        {
            Container.Clip = value;
            return this;
        }

        /// <summary>
        /// The chart pane height in pixels.
        /// </summary>
        /// <param name="value">The value for Height</param>
        public ChartPaneBuilder Height(double value)
        {
            Container.Height = value;
            return this;
        }

        /// <summary>
        /// The margin of the pane. A numeric value will set all margins.
        /// </summary>
        /// <param name="configurator">The configurator for the margin setting.</param>
        public ChartPaneBuilder Margin(Action<ChartPaneMarginSettingsBuilder> configurator)
        {

            Container.Margin.Chart = Container.Chart;
            configurator(new ChartPaneMarginSettingsBuilder(Container.Margin));

            return this;
        }

        /// <summary>
        /// The unique name of the chart pane.
        /// </summary>
        /// <param name="value">The value for Name</param>
        public ChartPaneBuilder Name(string value)
        {
            Container.Name = value;
            return this;
        }

        /// <summary>
        /// The padding of the pane. A numeric value will set all paddings.
        /// </summary>
        /// <param name="configurator">The configurator for the padding setting.</param>
        public ChartPaneBuilder Padding(Action<ChartPanePaddingSettingsBuilder> configurator)
        {

            Container.Padding.Chart = Container.Chart;
            configurator(new ChartPanePaddingSettingsBuilder(Container.Padding));

            return this;
        }

        /// <summary>
        /// The title configuration of the chart pane.
        /// </summary>
        /// <param name="configurator">The configurator for the title setting.</param>
        public ChartPaneBuilder Title(Action<ChartPaneTitleSettingsBuilder> configurator)
        {

            Container.Title.Chart = Container.Chart;
            configurator(new ChartPaneTitleSettingsBuilder(Container.Title));

            return this;
        }

    }
}
