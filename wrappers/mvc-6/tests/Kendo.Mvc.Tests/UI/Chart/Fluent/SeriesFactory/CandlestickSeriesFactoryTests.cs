using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;

namespace Kendo.Mvc.UI.Tests
{
    public class CandlestickSeriesFactoryTests
    {
        private readonly Chart<SalesData> chart;
        private readonly ChartSeriesFactory<SalesData> factory;

        public CandlestickSeriesFactoryTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
            factory = new ChartSeriesFactory<SalesData>(chart.Series);
        }
        
        [Fact]
        public void Candlestick_series_with_custom_data_should_set_Type()
        {
            factory.Candlestick(new int[] { });

            chart.Series[0].Type.ShouldEqual("candlestick");
        }

        [Fact]
        public void Candlestick_series_with_custom_data_should_set_series_data()
        {
            var data = new int[] { 1, 2, 3 };

            factory.Candlestick(data);

            chart.Series[0].Data.ShouldBeSameAs(data);
        }

        [Fact]
        public void Candlestick_series_with_custom_data_should_return_builder()
        {
            var builder = factory.Candlestick(new int[] { });

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void Candlestick_series_with_expression_should_set_OpenField()
        {
            factory.Candlestick(s => s.TotalSales, s => s.RepSalesHigh, s => s.RepSalesLow, s => s.RepSales);

            chart.Series[0].OpenField.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Candlestick_series_with_expression_should_set_CloseField()
        {
            factory.Candlestick(s => s.TotalSales, s => s.RepSalesHigh, s => s.RepSalesLow, s => s.RepSales);

            chart.Series[0].CloseField.ShouldEqual("RepSales");
        }

        [Fact]
        public void Candlestick_series_with_expression_should_set_HighField()
        {
            factory.Candlestick(s => s.TotalSales, s => s.RepSalesHigh, s => s.RepSalesLow, s => s.RepSales);

            chart.Series[0].HighField.ShouldEqual("RepSalesHigh");
        }
        
        [Fact]
        public void Candlestick_series_with_expression_should_set_LowField()
        {
            factory.Candlestick(s => s.TotalSales, s => s.RepSalesHigh, s => s.RepSalesLow, s => s.RepSales);

            chart.Series[0].LowField.ShouldEqual("RepSalesLow");
        }
        
        [Fact]
        public void Candlestick_series_with_expression_should_set_Type()
        {
           factory.Candlestick(s => s.TotalSales, s => s.RepSalesHigh, s => s.RepSalesLow, s => s.RepSales);

            chart.Series[0].Type.ShouldEqual("candlestick");
        }

        [Fact]
        public void Candlestick_series_with_expression_should_set_Name()
        {
            factory.Candlestick(s => s.TotalSales, s => s.RepSalesHigh, s => s.RepSalesLow, s => s.RepSales);

            chart.Series[0].Name.ShouldEqual("Total Sales, Rep Sales High, Rep Sales Low, Rep Sales");
        }

        [Fact]
        public void Candlestick_series_with_custom_name_should_override_default_Name()
        {
            factory.Candlestick(s => s.TotalSales, s => s.RepSalesHigh, s => s.RepSalesLow, s => s.RepSales)
                .Name("customName");

            chart.Series[0].Name.ShouldEqual("customName");
        }
        
        [Fact]
        public void Candlestick_series_with_expression_should_return_builder()
        {
            var builder = factory.Candlestick(s => s.TotalSales, s => s.RepSalesHigh, s => s.RepSalesLow, s => s.RepSales);

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }        
    }
}