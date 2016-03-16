using System;
using Kendo.Mvc.Tests;
using Kendo.Mvc.UI.Fluent;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class NavigatorSettingsBuilderTests
    {
        private readonly StockChart<object> chart;
        private readonly StockChartNavigatorSettings<object> settings;
        private readonly StockChartNavigatorSettingsBuilder<object> builder;

        public NavigatorSettingsBuilderTests()
        {
            chart = StockChartTestHelper.CreateStockChart<object>();
            settings = new StockChartNavigatorSettings<object>(chart, chart.ViewContext);
            builder = new StockChartNavigatorSettingsBuilder<object>(settings);
        }

        [Fact]
        public void DataSource_should_return_builder()
        {
            builder.DataSource(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_DateField()
        {
            var value = "value";

            builder.DateField(value);

            settings.DateField.ShouldEqual(value);
        }

        [Fact]
        public void DateField_should_return_builder()
        {
            builder.DateField("value").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Select_From()
        {
            var from = new DateTime(2016, 1, 2);
            var to = new DateTime(2016, 2, 3);

            builder.Select(from, to);

            settings.Select.From.ShouldEqual(from);
        }

        [Fact]
        public void Builder_should_set_Select_To()
        {
            var from = new DateTime(2016, 1, 2);
            var to = new DateTime(2016, 2, 3);

            builder.Select(from, to);

            settings.Select.To.ShouldEqual(to);
        }

        [Fact]
        public void Select_should_return_builder()
        {
            builder.Select(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Select_with_From_and_To_should_return_builder()
        {
            var from = new DateTime(2016, 1, 2);
            var to = new DateTime(2016, 2, 3);

            builder.Select(from, to).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Series()
        {
            var value = new int[] { 1, 2, 3 };

            builder.Series(x => x.Area(value));

            settings.Series[0].Data.ShouldEqual(value);
        }

        [Fact]
        public void Series_should_return_builder()
        {
            builder.Series(delegate { }).ShouldBeSameAs(builder);
        }
    }
}
