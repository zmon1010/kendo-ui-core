using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;

namespace Kendo.Mvc.UI.Tests
{
    public class ScatterSeriesFactoryTests
    {
        private readonly Chart<SalesData> chart;
        private readonly ChartSeriesFactory<SalesData> factory;

        public ScatterSeriesFactoryTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
            factory = new ChartSeriesFactory<SalesData>(chart.Series);
        }

        [Fact]
        public void Scatter_series_with_custom_data_should_set_Type()
        {
            factory.Scatter(new int[] { });

            chart.Series[0].Type.ShouldEqual("scatter");
        }

        [Fact]
        public void Scatter_series_with_custom_data_should_set_series_data()
        {
            var data = new int[] { 1, 2, 3 };

            factory.Scatter(data);

            chart.Series[0].Data.ShouldBeSameAs(data);
        }

        [Fact]
        public void Scatter_series_with_custom_data_should_return_builder()
        {
            var builder = factory.Scatter(new int[] { });

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void Scatter_series_with_expression_should_set_XField()
        {
            CreateSeries();

            chart.Series[0].XField.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Scatter_series_with_expression_should_set_YField()
        {
            CreateSeries();

            chart.Series[0].YField.ShouldEqual("RepSalesHigh");
        }


        [Fact]
        public void Scatter_series_with_expression_should_set_Type()
        {
            CreateSeries();

            chart.Series[0].Type.ShouldEqual("scatter");
        }

        [Fact]
        public void Scatter_series_with_members_should_set_Name()
        {
            factory.ScatterLine("TotalSales", "RepSalesHigh");

            chart.Series[0].Name.ShouldEqual("Total Sales, Rep Sales High");
        }

        [Fact]
        public void Scatter_series_with_expression_should_not_set_Name()
        {
            CreateSeries();

            chart.Series[0].Name.ShouldEqual(null);
        }

        [Fact]
        public void Scatter_series_with_expression_should_return_builder()
        {
            var builder = CreateSeries();

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }
        
        private ChartSeriesBuilder<SalesData> CreateSeries()
        {
            return factory.Scatter(s => s.TotalSales, s => s.RepSalesHigh);
        }
    }
}