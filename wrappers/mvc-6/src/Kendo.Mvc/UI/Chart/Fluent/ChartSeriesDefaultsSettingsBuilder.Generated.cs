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
    }
}
