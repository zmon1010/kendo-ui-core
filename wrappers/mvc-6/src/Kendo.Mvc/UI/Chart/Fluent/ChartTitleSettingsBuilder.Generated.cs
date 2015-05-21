using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartTitleSettings
    /// </summary>
    public partial class ChartTitleSettingsBuilder
        
    {
        /// <summary>
        /// The alignment of the title.
        /// </summary>
        /// <param name="value">The value for Align</param>
        public ChartTitleSettingsBuilder Align(string value)
        {
            Container.Align = value;
            return this;
        }

        /// <summary>
        /// The background color of the title. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Background</param>
        public ChartTitleSettingsBuilder Background(string value)
        {
            Container.Background = value;
            return this;
        }

        /// <summary>
        /// The border of the series.
        /// </summary>
        /// <param name="configurator">The configurator for the border setting.</param>
        public ChartTitleSettingsBuilder Border(Action<ChartTitleBorderSettingsBuilder> configurator)
        {

            Container.Border.Chart = Container.Chart;
            configurator(new ChartTitleBorderSettingsBuilder(Container.Border));

            return this;
        }

        /// <summary>
        /// The text color of the title. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public ChartTitleSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The font of the title.
        /// </summary>
        /// <param name="value">The value for Font</param>
        public ChartTitleSettingsBuilder Font(string value)
        {
            Container.Font = value;
            return this;
        }

        /// <summary>
        /// The margin of the title. A numeric value will set all margins.
        /// </summary>
        /// <param name="configurator">The configurator for the margin setting.</param>
        public ChartTitleSettingsBuilder Margin(Action<ChartTitleMarginSettingsBuilder> configurator)
        {

            Container.Margin.Chart = Container.Chart;
            configurator(new ChartTitleMarginSettingsBuilder(Container.Margin));

            return this;
        }

        /// <summary>
        /// The padding of the title. A numeric value will set all margins.
        /// </summary>
        /// <param name="configurator">The configurator for the padding setting.</param>
        public ChartTitleSettingsBuilder Padding(Action<ChartTitlePaddingSettingsBuilder> configurator)
        {

            Container.Padding.Chart = Container.Chart;
            configurator(new ChartTitlePaddingSettingsBuilder(Container.Padding));

            return this;
        }

        /// <summary>
        /// The position of the title.
        /// </summary>
        /// <param name="value">The value for Position</param>
        public ChartTitleSettingsBuilder Position(string value)
        {
            Container.Position = value;
            return this;
        }

        /// <summary>
        /// The text of the chart title. You can also set the text directly for a title with default options.
        /// </summary>
        /// <param name="value">The value for Text</param>
        public ChartTitleSettingsBuilder Text(string value)
        {
            Container.Text = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the title. By default the title is not displayed.
        /// </summary>
        /// <param name="value">The value for Visible</param>
        public ChartTitleSettingsBuilder Visible(bool value)
        {
            Container.Visible = value;
            return this;
        }

        /// <summary>
        /// If set to true the chart will display the title. By default the title is not displayed.
        /// </summary>
        public ChartTitleSettingsBuilder Visible()
        {
            Container.Visible = true;
            return this;
        }

    }
}
