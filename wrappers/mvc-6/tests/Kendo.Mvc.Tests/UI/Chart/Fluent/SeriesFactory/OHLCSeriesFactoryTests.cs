using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;

namespace Kendo.Mvc.UI.Tests
{
    public class OHLCSeriesFactoryTests
    {
        private readonly Chart<SalesData> chart;
        private readonly ChartSeriesFactory<SalesData> factory;

        public OHLCSeriesFactoryTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
            factory = new ChartSeriesFactory<SalesData>(chart.Series);
        }

        [Fact]
        public void OHLC_series_with_custom_data_should_set_Type()
        {
            factory.OHLC(new int[] { });

            chart.Series[0].Type.ShouldEqual("ohlc");
        }

        [Fact]
        public void OHLC_series_with_custom_data_should_set_series_data()
        {
            var data = new int[] { 1, 2, 3 };

            factory.OHLC(data);

            chart.Series[0].Data.ShouldBeSameAs(data);
        }

        [Fact]
        public void OHLC_series_with_custom_data_should_return_builder()
        {
            var builder = factory.OHLC(new int[] { });

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void OHLC_series_with_expression_should_set_OpenField()
        {
            CreateSeries();

            chart.Series[0].OpenField.ShouldEqual("TotalSales");
        }

        [Fact]
        public void OHLC_series_with_expression_should_set_CloseField()
        {
            CreateSeries();

            chart.Series[0].CloseField.ShouldEqual("RepSales");
        }

        [Fact]
        public void OHLC_series_with_expression_should_set_HighField()
        {
            CreateSeries();

            chart.Series[0].HighField.ShouldEqual("RepSalesHigh");
        }

        [Fact]
        public void OHLC_series_with_expression_should_set_LowField()
        {
            CreateSeries();

            chart.Series[0].LowField.ShouldEqual("RepSalesLow");
        }

        [Fact]
        public void OHLC_series_with_expression_should_set_Type()
        {
            CreateSeries();

            chart.Series[0].Type.ShouldEqual("ohlc");
        }

        [Fact]
        public void OHLC_series_with_expression_should_not_set_Name()
        {
            CreateSeries();

            chart.Series[0].Name.ShouldEqual(null);
        }

        [Fact]
        public void OHLC_series_with_custom_name_should_override_default_Name()
        {
            CreateSeries().Name("customName");

            chart.Series[0].Name.ShouldEqual("customName");
        }

        [Fact]
        public void OHLC_series_with_expression_should_return_builder()
        {
            var builder = CreateSeries();

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        private ChartSeriesBuilder<SalesData> CreateSeries()
        {
            return factory.OHLC(s => s.TotalSales, s => s.RepSalesHigh, s => s.RepSalesLow, s => s.RepSales);
        }
}
}