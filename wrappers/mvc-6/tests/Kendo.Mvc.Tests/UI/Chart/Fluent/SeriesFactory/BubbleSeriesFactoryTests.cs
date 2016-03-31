using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;

namespace Kendo.Mvc.UI.Tests
{
    public class BubbleSeriesFactoryTests
    {
        private readonly Chart<SalesData> chart;
        private readonly ChartSeriesFactory<SalesData> factory;

        public BubbleSeriesFactoryTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
            factory = new ChartSeriesFactory<SalesData>(chart.Series);
        }

        [Fact]
        public void Bubble_series_with_custom_data_should_set_Type()
        {
            factory.Bubble(new int[] { });

            chart.Series[0].Type.ShouldEqual("bubble");
        }

        [Fact]
        public void Bubble_series_with_custom_data_should_set_series_data()
        {
            var data = new int[] { 1, 2, 3 };

            factory.Bubble(data);

            chart.Series[0].Data.ShouldBeSameAs(data);
        }

        [Fact]
        public void Bubble_series_with_custom_data_should_return_builder()
        {
            var builder = factory.Bubble(new int[] { });

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void Bubble_series_with_expression_should_set_XField()
        {
            CreateSeries();

            chart.Series[0].XField.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Bubble_series_with_expression_should_set_YField()
        {
            CreateSeries();

            chart.Series[0].YField.ShouldEqual("RepSalesHigh");
        }

        [Fact]
        public void Bubble_series_with_expression_should_set_SizeField()
        {
            CreateSeries();

            chart.Series[0].SizeField.ShouldEqual("RepSalesLow");
        }

        [Fact]
        public void Bubble_series_with_expression_should_set_CategoryField()
        {
            CreateSeries();

            chart.Series[0].CategoryField.ShouldEqual("RepSales");
        }

        [Fact]
        public void Bubble_series_with_expression_should_set_Type()
        {
            CreateSeries();

            chart.Series[0].Type.ShouldEqual("bubble");
        }

        [Fact]
        public void Bubble_series_with_expression_should_not_set_Name()
        {
            CreateSeries();

            chart.Series[0].Name.ShouldEqual(null);
        }

        [Fact]
        public void Bubble_series_with_custom_name_should_override_default_Name()
        {
            CreateSeries().Name("customName");

            chart.Series[0].Name.ShouldEqual("customName");
        }

        [Fact]
        public void Bubble_series_with_default_expression_should_return_builder()
        {
            var builder = factory.Bubble(s => s.TotalSales, s => s.RepSalesHigh, x => x.RepSalesLow);

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void Bubble_series_with_expression_should_return_builder()
        {
            var builder = CreateSeries();

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        private ChartSeriesBuilder<SalesData> CreateSeries()
        {
            return factory.Bubble(s => s.TotalSales, s => s.RepSalesHigh, x => x.RepSalesLow, x => x.RepSales);
        }
    }
}