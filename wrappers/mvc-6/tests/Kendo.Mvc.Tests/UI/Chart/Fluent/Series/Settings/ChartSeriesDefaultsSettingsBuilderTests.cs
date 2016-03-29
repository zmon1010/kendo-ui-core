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
        public void Line_series_should_return_builder()
        {
            builder.Line().ShouldBeType(typeof(ChartSeriesBuilder<object>));
        }
    }
}