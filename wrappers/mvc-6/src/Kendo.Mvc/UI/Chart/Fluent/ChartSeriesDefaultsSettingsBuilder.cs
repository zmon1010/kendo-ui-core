using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartTitleSettings
    /// </summary>
    public partial class ChartSeriesDefaultsSettingsBuilder
        
    {
        public ChartSeriesDefaultsSettingsBuilder(ChartSeriesDefaultsSettings container)
        {
            Container = container;
        }

        protected ChartSeriesDefaultsSettings Container
        {
            get;
            private set;
        }

        /// <summary>
        /// The Area series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Area series settings.</param>
        public ChartSeriesBuilder Area()
        {
            return new ChartSeriesBuilder(Container.Area);
        }

        /// <summary>
        /// The Bar series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Bar series settings.</param>
        public ChartSeriesBuilder Bar()
        {
            return new ChartSeriesBuilder(Container.Bar);
        }

        /// <summary>
        /// The Column series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Column series settings.</param>
        public ChartSeriesBuilder Column()
        {
            return new ChartSeriesBuilder(Container.Column);
        }

        /// <summary>
        /// The Line series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Line series settings.</param>
        public ChartSeriesBuilder Line()
        {
            return new ChartSeriesBuilder(Container.Line);
        }

        /// <summary>
        /// The VerticalArea series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the VerticalArea series settings.</param>
        public ChartSeriesBuilder VerticalArea()
        {
            return new ChartSeriesBuilder(Container.VerticalArea);
        }

        /// <summary>
        /// The VerticalLine series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the VerticalLine series settings.</param>
        public ChartSeriesBuilder VerticalLine()
        {
            return new ChartSeriesBuilder(Container.VerticalLine);
        }

        /// <summary>
        /// The RadarArea series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the RadarArea series settings.</param>
        public ChartSeriesBuilder RadarArea()
        {
            return new ChartSeriesBuilder(Container.RadarArea);
        }

        /// <summary>
        /// The RadarColumn series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the RadarColumn series settings.</param>
        public ChartSeriesBuilder RadarColumn()
        {
            return new ChartSeriesBuilder(Container.RadarColumn);
        }

        /// <summary>
        /// The RadarLine series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the RadarLine series settings.</param>
        public ChartSeriesBuilder RadarLine()
        {
            return new ChartSeriesBuilder(Container.RadarLine);
        }

        /// <summary>
        /// The BoxPlot series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the BoxPlot series settings.</param>
        public ChartSeriesBuilder BoxPlot()
        {
            return new ChartSeriesBuilder(Container.BoxPlot);
        }

        /// <summary>
        /// The Bubble series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Bubble series settings.</param>
        public ChartSeriesBuilder Bubble()
        {
            return new ChartSeriesBuilder(Container.Bubble);
        }

        /// <summary>
        /// The Bullet series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Bullet series settings.</param>
        public ChartSeriesBuilder Bullet()
        {
            return new ChartSeriesBuilder(Container.Bullet);
        }

        /// <summary>
        /// The VerticalBullet series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the VerticalBullet series settings.</param>
        public ChartSeriesBuilder VerticalBullet()
        {
            return new ChartSeriesBuilder(Container.VerticalBullet);
        }

        /// <summary>
        /// The Candlestick series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Candlestick series settings.</param>
        public ChartSeriesBuilder Candlestick()
        {
            return new ChartSeriesBuilder(Container.Candlestick);
        }

        /// <summary>
        /// The OHLC series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the OHLC series settings.</param>
        public ChartSeriesBuilder OHLC()
        {
            return new ChartSeriesBuilder(Container.OHLC);
        }

        /// <summary>
        /// The Funnel series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Funnel series settings.</param>
        public ChartSeriesBuilder Funnel()
        {
            return new ChartSeriesBuilder(Container.Funnel);
        }

        /// <summary>
        /// The RangeColumn series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the RangeColumn series settings.</param>
        public ChartSeriesBuilder RangeColumn()
        {
            return new ChartSeriesBuilder(Container.RangeColumn);
        }

        /// <summary>
        /// The RangeBar series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the RangeBar series settings.</param>
        public ChartSeriesBuilder RangeBar()
        {
            return new ChartSeriesBuilder(Container.RangeBar);
        }

        /// <summary>
        /// The Pie series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Pie series settings.</param>
        public ChartSeriesBuilder Pie()
        {
            return new ChartSeriesBuilder(Container.Pie);
        }

        /// <summary>
        /// The Donut series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Donut series settings.</param>
        public ChartSeriesBuilder Donut()
        {
            return new ChartSeriesBuilder(Container.Donut);
        }

        /// <summary>
        /// The Scatter series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Scatter series settings.</param>
        public ChartSeriesBuilder Scatter()
        {
            return new ChartSeriesBuilder(Container.Scatter);
        }

        /// <summary>
        /// The ScatterLine series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the ScatterLine series settings.</param>
        public ChartSeriesBuilder ScatterLine()
        {
            return new ChartSeriesBuilder(Container.ScatterLine);
        }

        /// <summary>
        /// The PolarArea series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the PolarArea series settings.</param>
        public ChartSeriesBuilder PolarArea()
        {
            return new ChartSeriesBuilder(Container.PolarArea);
        }

        /// <summary>
        /// The PolarLine series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the PolarLine series settings.</param>
        public ChartSeriesBuilder PolarLine()
        {
            return new ChartSeriesBuilder(Container.PolarLine);
        }

        /// <summary>
        /// The PolarScatter series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the PolarScatter series settings.</param>
        public ChartSeriesBuilder PolarScatter()
        {
            return new ChartSeriesBuilder(Container.PolarScatter);
        }

        /// <summary>
        /// The Waterfall series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the Waterfall series settings.</param>
        public ChartSeriesBuilder Waterfall()
        {
            return new ChartSeriesBuilder(Container.Waterfall);
        }

        /// <summary>
        /// The HorizontalWaterfall series default settings.
        /// </summary>
        /// <param name="configurator">The configurator for the HorizontalWaterfall series settings.</param>
        public ChartSeriesBuilder HorizontalWaterfall()
        {
            return new ChartSeriesBuilder(Container.HorizontalWaterfall);
        }
    }
}
