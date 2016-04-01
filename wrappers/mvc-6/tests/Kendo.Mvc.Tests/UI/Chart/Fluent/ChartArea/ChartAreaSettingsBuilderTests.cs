using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartAreaBuilderTests
    {
        private readonly ChartChartAreaSettings<object> settings;
        private readonly ChartChartAreaSettingsBuilder<object> builder;

        public ChartAreaBuilderTests()
        {
            settings = new ChartChartAreaSettings<object>();
            builder = new ChartChartAreaSettingsBuilder<object>(settings);
        }

        [Fact]
        public void Builder_should_set_Margin()
        {
            var value = 10;
            builder.Margin(value); ;

            settings.Margin.Top.ShouldEqual(value);
            settings.Margin.Right.ShouldEqual(value);
            settings.Margin.Bottom.ShouldEqual(value);
            settings.Margin.Left.ShouldEqual(value);
        }

        [Fact]
        public void Margin_should_return_builder()
        {
            builder.Margin(10).ShouldBeSameAs(builder);
        }
    }
}