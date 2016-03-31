using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring Chart series defaults settings
    /// </summary>
    public partial class ChartSeriesDefaultsSettingsBuilder<T> where T : class
    {
        public ChartSeriesDefaultsSettingsBuilder(ChartSeriesDefaultsSettings<T> container)
        {
            Container = container;
        }

        protected ChartSeriesDefaultsSettings<T> Container
        {
            get;
            private set;
        }

        /// <summary>
        /// The area series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the area series settings.</param>
        public ChartSeriesBuilder<T> Area()
        {
            return new ChartSeriesBuilder<T>(Container.Area);
        }

        /// <summary>
        /// The bar series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the bar series settings.</param>
        public ChartSeriesBuilder<T> Bar()
        {
            return new ChartSeriesBuilder<T>(Container.Bar);
        }

        /// <summary>
        /// The bubble series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the bubble series settings.</param>
        public ChartSeriesBuilder<T> Bubble()
        {
            return new ChartSeriesBuilder<T>(Container.Bubble);
        }

        /// <summary>
        /// The candlestick series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the candlestick series settings.</param>
        public ChartSeriesBuilder<T> Candlestick()
        {
            return new ChartSeriesBuilder<T>(Container.Candlestick);
        }

        /// <summary>
        /// The column series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the column series settings.</param>
        public ChartSeriesBuilder<T> Column()
        {
            return new ChartSeriesBuilder<T>(Container.Column);
        }

        /// <summary>
        /// The line series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the line series settings.</param>
        public ChartSeriesBuilder<T> Line()
        {
            return new ChartSeriesBuilder<T>(Container.Line);
        }

        /// <summary>
        /// The scatter series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the scatter series settings.</param>
        public ChartSeriesBuilder<T> Scatter()
        {
            return new ChartSeriesBuilder<T>(Container.Scatter);
        }

        /// <summary>
        /// The scatterLine series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the scatterLine series settings.</param>
        public ChartSeriesBuilder<T> ScatterLine()
        {
            return new ChartSeriesBuilder<T>(Container.ScatterLine);
        }
    }
}
