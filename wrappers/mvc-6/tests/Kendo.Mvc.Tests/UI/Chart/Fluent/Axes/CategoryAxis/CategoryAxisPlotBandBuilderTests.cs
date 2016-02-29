using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.UI.Tests;
using Xunit;

namespace Kendo.Mvc.Tests
{
    public class CategoryAxisPlotBandBuilderTests
    {
        private readonly ChartCategoryAxisPlotBand<SalesData> plotBand;
        private readonly ChartCategoryAxisPlotBandBuilder<SalesData> builder;

        public CategoryAxisPlotBandBuilderTests()
        {
            plotBand = new ChartCategoryAxisPlotBand<SalesData>();
            builder = new ChartCategoryAxisPlotBandBuilder<SalesData>(plotBand);
        }

        [Fact]
        public void Builder_should_set_Color()
        {
            var value = "red";

            builder.Color(value);

            plotBand.Color.ShouldEqual(value);
        }

        [Fact]
        public void Color_should_return_builder()
        {
            builder.Color("red").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_From()
        {
            builder.From(123);

            Assert.Equal<object>(123, plotBand.From);
        }

        [Fact]
        public void From_should_return_builder()
        {
            builder.From(123).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Opacity()
        {
            var value = 123.456;

            builder.Opacity(value);

            plotBand.Opacity.ShouldEqual(value);
        }

        [Fact]
        public void Opacity_should_return_builder()
        {
            builder.Opacity(123.456).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_To()
        {
            builder.To(123);

            Assert.Equal<object>(123, plotBand.To);
        }

        [Fact]
        public void To_should_return_builder()
        {
            builder.To(123).ShouldBeSameAs(builder);
        }
    }
}
