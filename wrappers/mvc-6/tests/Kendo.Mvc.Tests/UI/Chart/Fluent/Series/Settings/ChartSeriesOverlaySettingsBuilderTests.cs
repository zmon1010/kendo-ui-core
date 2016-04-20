using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;
using Moq;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartSeriesOverlaySettingsBuilderTests
    {
        private readonly ChartSeriesOverlaySettings<SalesData> settings;
        private readonly ChartSeriesOverlaySettingsBuilder<SalesData> builder;

        public ChartSeriesOverlaySettingsBuilderTests()
        {
            settings = new ChartSeriesOverlaySettings<SalesData>();
            builder = new ChartSeriesOverlaySettingsBuilder<SalesData>(settings);
        }

        [Fact]
        public void Builder_should_set_Gradient()
        {
            var value = ChartSeriesGradient.Glass;

            builder.Gradient(value);

            settings.Gradient.ShouldEqual(value);
        }

        [Fact]
        public void Gradient_should_return_builder()
        {
            builder.Gradient(ChartSeriesGradient.Glass).ShouldBeSameAs(builder);
        }
    }
}