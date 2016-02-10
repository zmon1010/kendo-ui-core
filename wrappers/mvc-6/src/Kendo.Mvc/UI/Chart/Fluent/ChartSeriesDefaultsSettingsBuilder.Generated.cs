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
        /// The Area series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Area series settings.</param>
        public ChartSeriesBuilder<T> Area()
        {
            return new ChartSeriesBuilder<T>(Container.Area);
        }

        /// <summary>
        /// The Bar series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Bar series settings.</param>
        public ChartSeriesBuilder<T> Bar()
        {
            return new ChartSeriesBuilder<T>(Container.Bar);
        }

        /// <summary>
        /// The Column series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Column series settings.</param>
        public ChartSeriesBuilder<T> Column()
        {
            return new ChartSeriesBuilder<T>(Container.Column);
        }

        /// <summary>
        /// The Line series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Line series settings.</param>
        public ChartSeriesBuilder<T> Line()
        {
            return new ChartSeriesBuilder<T>(Container.Line);
        }

        /// <summary>
        /// The VerticalArea series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the VerticalArea series settings.</param>
        public ChartSeriesBuilder<T> VerticalArea()
        {
            return new ChartSeriesBuilder<T>(Container.VerticalArea);
        }

        /// <summary>
        /// The VerticalLine series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the VerticalLine series settings.</param>
        public ChartSeriesBuilder<T> VerticalLine()
        {
            return new ChartSeriesBuilder<T>(Container.VerticalLine);
        }

        /// <summary>
        /// The RadarArea series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the RadarArea series settings.</param>
        public ChartSeriesBuilder<T> RadarArea()
        {
            return new ChartSeriesBuilder<T>(Container.RadarArea);
        }

        /// <summary>
        /// The RadarColumn series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the RadarColumn series settings.</param>
        public ChartSeriesBuilder<T> RadarColumn()
        {
            return new ChartSeriesBuilder<T>(Container.RadarColumn);
        }

        /// <summary>
        /// The RadarLine series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the RadarLine series settings.</param>
        public ChartSeriesBuilder<T> RadarLine()
        {
            return new ChartSeriesBuilder<T>(Container.RadarLine);
        }

        /// <summary>
        /// The BoxPlot series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the BoxPlot series settings.</param>
        public ChartSeriesBuilder<T> BoxPlot()
        {
            return new ChartSeriesBuilder<T>(Container.BoxPlot);
        }

        /// <summary>
        /// The Bubble series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Bubble series settings.</param>
        public ChartSeriesBuilder<T> Bubble()
        {
            return new ChartSeriesBuilder<T>(Container.Bubble);
        }

        /// <summary>
        /// The Bullet series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Bullet series settings.</param>
        public ChartSeriesBuilder<T> Bullet()
        {
            return new ChartSeriesBuilder<T>(Container.Bullet);
        }

        /// <summary>
        /// The VerticalBullet series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the VerticalBullet series settings.</param>
        public ChartSeriesBuilder<T> VerticalBullet()
        {
            return new ChartSeriesBuilder<T>(Container.VerticalBullet);
        }

        /// <summary>
        /// The Candlestick series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Candlestick series settings.</param>
        public ChartSeriesBuilder<T> Candlestick()
        {
            return new ChartSeriesBuilder<T>(Container.Candlestick);
        }

        /// <summary>
        /// The OHLC series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the OHLC series settings.</param>
        public ChartSeriesBuilder<T> OHLC()
        {
            return new ChartSeriesBuilder<T>(Container.OHLC);
        }

        /// <summary>
        /// The Funnel series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Funnel series settings.</param>
        public ChartSeriesBuilder<T> Funnel()
        {
            return new ChartSeriesBuilder<T>(Container.Funnel);
        }

        /// <summary>
        /// The RangeColumn series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the RangeColumn series settings.</param>
        public ChartSeriesBuilder<T> RangeColumn()
        {
            return new ChartSeriesBuilder<T>(Container.RangeColumn);
        }

        /// <summary>
        /// The RangeBar series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the RangeBar series settings.</param>
        public ChartSeriesBuilder<T> RangeBar()
        {
            return new ChartSeriesBuilder<T>(Container.RangeBar);
        }

        /// <summary>
        /// The Pie series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Pie series settings.</param>
        public ChartSeriesBuilder<T> Pie()
        {
            return new ChartSeriesBuilder<T>(Container.Pie);
        }

        /// <summary>
        /// The Donut series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Donut series settings.</param>
        public ChartSeriesBuilder<T> Donut()
        {
            return new ChartSeriesBuilder<T>(Container.Donut);
        }

        /// <summary>
        /// The Scatter series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Scatter series settings.</param>
        public ChartSeriesBuilder<T> Scatter()
        {
            return new ChartSeriesBuilder<T>(Container.Scatter);
        }

        /// <summary>
        /// The ScatterLine series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the ScatterLine series settings.</param>
        public ChartSeriesBuilder<T> ScatterLine()
        {
            return new ChartSeriesBuilder<T>(Container.ScatterLine);
        }

        /// <summary>
        /// The PolarArea series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the PolarArea series settings.</param>
        public ChartSeriesBuilder<T> PolarArea()
        {
            return new ChartSeriesBuilder<T>(Container.PolarArea);
        }

        /// <summary>
        /// The PolarLine series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the PolarLine series settings.</param>
        public ChartSeriesBuilder<T> PolarLine()
        {
            return new ChartSeriesBuilder<T>(Container.PolarLine);
        }

        /// <summary>
        /// The PolarScatter series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the PolarScatter series settings.</param>
        public ChartSeriesBuilder<T> PolarScatter()
        {
            return new ChartSeriesBuilder<T>(Container.PolarScatter);
        }

        /// <summary>
        /// The Waterfall series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Waterfall series settings.</param>
        public ChartSeriesBuilder<T> Waterfall()
        {
            return new ChartSeriesBuilder<T>(Container.Waterfall);
        }

        /// <summary>
        /// The HorizontalWaterfall series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the HorizontalWaterfall series settings.</param>
        public ChartSeriesBuilder<T> HorizontalWaterfall()
        {
            return new ChartSeriesBuilder<T>(Container.HorizontalWaterfall);
        }

    }
}
