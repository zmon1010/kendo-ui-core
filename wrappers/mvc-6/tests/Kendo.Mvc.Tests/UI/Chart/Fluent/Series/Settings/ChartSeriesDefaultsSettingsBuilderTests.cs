using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;
using Moq;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartSeriesDefaultsSettingsBuilderTests
    {
        private readonly ChartSeriesDefaultsSettings<object> settings;
        private readonly ChartSeriesDefaultsSettingsBuilder<object> builder;

        public ChartSeriesDefaultsSettingsBuilderTests()
        {
            settings = new ChartSeriesDefaultsSettings<object>();
            builder = new ChartSeriesDefaultsSettingsBuilder<object>(settings);
        }

        [Fact]
        public void Area_series_should_return_builder()
        {
            builder.Area().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void Bar_series_should_return_builder()
        {
            builder.Bar().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void BoxPlot_series_should_return_builder()
        {
            builder.BoxPlot().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void Bubble_series_should_return_builder()
        {
            builder.Bubble().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void Bullet_series_should_return_builder()
        {
            builder.Bullet().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void Candlestick_series_should_return_builder()
        {
            builder.Candlestick().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void Column_series_should_return_builder()
        {
            builder.Column().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void Donut_series_should_return_builder()
        {
            builder.Donut().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void Funnel_series_should_return_builder()
        {
            builder.Funnel().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void HorizontalWaterfall_series_should_return_builder()
        {
            builder.HorizontalWaterfall().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void Line_series_should_return_builder()
        {
            builder.Line().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void OHLC_series_should_return_builder()
        {
            builder.OHLC().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void Pie_series_should_return_builder()
        {
            builder.Pie().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void PolarArea_series_should_return_builder()
        {
            builder.PolarArea().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void PolarLine_series_should_return_builder()
        {
            builder.PolarLine().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void PolarScatter_series_should_return_builder()
        {
            builder.PolarScatter().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void RadarArea_series_should_return_builder()
        {
            builder.RadarArea().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void RadarColumn_series_should_return_builder()
        {
            builder.RadarColumn().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void RadarLine_series_should_return_builder()
        {
            builder.RadarLine().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void RangeBar_series_should_return_builder()
        {
            builder.RangeBar().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void RangeColumn_series_should_return_builder()
        {
            builder.RangeColumn().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void ScatterLine_series_should_return_builder()
        {
            builder.ScatterLine().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void Scatter_series_should_return_builder()
        {
            builder.Scatter().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void VerticalArea_series_should_return_builder()
        {
            builder.VerticalArea().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void VerticalBullet_series_should_return_builder()
        {
            builder.VerticalBullet().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void VerticalLine_series_should_return_builder()
        {
            builder.VerticalLine().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }

        [Fact]
        public void Waterfall_series_should_return_builder()
        {
            builder.Waterfall().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }
    }
}