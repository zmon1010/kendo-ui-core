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
        /// The bullet series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the bullet series settings.</param>
        public ChartSeriesBuilder<T> Bullet()
        {
            return new ChartSeriesBuilder<T>(Container.Bullet);
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
        /// The donut series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the donut series settings.</param>
        public ChartSeriesBuilder<T> Donut()
        {
            return new ChartSeriesBuilder<T>(Container.Donut);
        }

        /// <summary>
        /// The funnel series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the funnel series settings.</param>
        public ChartSeriesBuilder<T> Funnel()
        {
            return new ChartSeriesBuilder<T>(Container.Funnel);
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
        /// The pie series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the pie series settings.</param>
        public ChartSeriesBuilder<T> Pie()
        {
            return new ChartSeriesBuilder<T>(Container.Pie);
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

        /// <summary>
        /// The verticalBullet series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the verticalBullet series settings.</param>
        public ChartSeriesBuilder<T> VerticalBullet()
        {
            return new ChartSeriesBuilder<T>(Container.VerticalBullet);
        }
    }
}
