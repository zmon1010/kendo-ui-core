using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;
using Moq;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartSeriesLineSettingsBuilderTests
    {
        private readonly ChartSeriesLineSettings<SalesData> settings;
        private readonly ChartSeriesLineSettingsBuilder<SalesData> builder;

        public ChartSeriesLineSettingsBuilderTests()
        {
            settings = new ChartSeriesLineSettings<SalesData>();
            builder = new ChartSeriesLineSettingsBuilder<SalesData>(settings);
        }

        [Fact]
        public void Builder_should_set_Style()
        {
            var value = ChartSeriesLineStyle.Smooth;

            builder.Style(value);

            settings.Style.ShouldEqual(value);
        }

        [Fact]
        public void Style_should_return_builder()
        {
            builder.Style(ChartSeriesLineStyle.Smooth).ShouldBeSameAs(builder);
        }
    }
}