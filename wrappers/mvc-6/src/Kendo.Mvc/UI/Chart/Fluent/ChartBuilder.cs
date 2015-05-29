using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI Chart
    /// </summary>
    public partial class ChartBuilder: WidgetBuilderBase<Chart, ChartBuilder>
        
    {
        public ChartBuilder(Chart component) : base(component)
        {
        }

        /// <summary>
        /// The chart title.
        /// </summary>
        /// <param name="title">The value of the Chart title</param>
        public ChartBuilder Title(string title)
        {
            Container.Title.Text = title;
            return this;
        }

        public ChartBuilder SeriesDefaults(Action<ChartSeriesDefaultsSettingsBuilder> configurator)
        {
            configurator(new ChartSeriesDefaultsSettingsBuilder(Container.SeriesDefaults));

            return this;
        }

        /// <summary>
        /// Configures the default category axis or adds a new one
        /// </summary>
        /// <param name="configurator">The configurator for the axis</param>
        /// <returns></returns>
        public ChartBuilder CategoryAxis(Action<ChartCategoryAxisBuilder> configurator)
        {
            configurator(new ChartCategoryAxisFactory(Container.CategoryAxis).Add());
            return this;
        }

        /// <summary>
        /// Configures the default value axis or adds a new one
        /// </summary>
        /// <param name="configurator">The configurator for the axis</param>
        /// <returns></returns>
        public ChartBuilder ValueAxis(Action<ChartValueAxisBuilder> configurator)
        {
            configurator(new ChartValueAxisFactory(Container.ValueAxis).Add());
            return this;
        }

        /// <summary>
        /// Configures the default X axis or adds a new one
        /// </summary>
        /// <param name="configurator">The configurator for the axis</param>
        /// <returns></returns>
        public ChartBuilder XAxis(Action<ChartXAxisBuilder> configurator)
        {
            configurator(new ChartXAxisFactory(Container.XAxis).Add());
            return this;
        }

        /// <summary>
        /// Configures the default Y axis or adds a new one
        /// </summary>
        /// <param name="configurator">The configurator for the axis</param>
        /// <returns></returns>
        public ChartBuilder YAxis(Action<ChartYAxisBuilder> configurator)
        {
            configurator(new ChartYAxisFactory(Container.YAxis).Add());
            return this;
        }
    }
}

