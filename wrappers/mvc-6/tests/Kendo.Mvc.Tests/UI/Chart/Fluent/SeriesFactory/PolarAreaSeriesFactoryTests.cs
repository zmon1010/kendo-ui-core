using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;

namespace Kendo.Mvc.UI.Tests
{
    public class PolarAreaSeriesFactoryTests
    {
        private readonly Chart<SalesData> chart;
        private readonly ChartSeriesFactory<SalesData> factory;

        public PolarAreaSeriesFactoryTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
            factory = new ChartSeriesFactory<SalesData>(chart.Series);
        }

        [Fact]
        public void PolarArea_series_with_custom_data_should_set_Type()
        {
            factory.PolarArea(new int[] { });

            chart.Series[0].Type.ShouldEqual("polarArea");
        }

        [Fact]
        public void PolarArea_series_with_custom_data_should_set_series_data()
        {
            var data = new int[] { 1, 2, 3 };

            factory.PolarArea(data);

            chart.Series[0].Data.ShouldBeSameAs(data);
        }

        [Fact]
        public void PolarArea_series_with_custom_data_should_return_builder()
        {
            var builder = factory.PolarArea(new int[] { });

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void PolarArea_series_with_expression_should_set_XField()
        {
            CreateSeries();

            chart.Series[0].XField.ShouldEqual("TotalSales");
        }

        [Fact]
        public void PolarArea_series_with_expression_should_set_YField()
        {
            CreateSeries();

            chart.Series[0].YField.ShouldEqual("RepSalesHigh");
        }


        [Fact]
        public void PolarArea_series_with_expression_should_set_Type()
        {
            CreateSeries();

            chart.Series[0].Type.ShouldEqual("polarArea");
        }

        [Fact]
        public void PolarArea_series_with_members_should_set_Name()
        {
            factory.PolarArea("TotalSales", "RepSalesHigh");

            chart.Series[0].Name.ShouldEqual("Total Sales, Rep Sales High");
        }

        [Fact]
        public void PolarArea_series_with_expression_should_not_set_Name()
        {
            CreateSeries();

            chart.Series[0].Name.ShouldEqual(null);
        }

        [Fact]
        public void PolarArea_series_with_custom_name_should_override_default_Name()
        {
            CreateSeries().Name("customName");

            chart.Series[0].Name.ShouldEqual("customName");
        }

        [Fact]
        public void PolarArea_series_with_expression_should_return_builder()
        {
            var builder = CreateSeries();

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void PolarArea_series_created_with_named_expression_should_set_XField()
        {
            factory.PolarArea(xValueExpression: s => s.TotalSales, yValueExpression: s => s.RepSalesHigh);

            chart.Series[0].XField.ShouldEqual("TotalSales");
        }

        [Fact]
        public void PolarArea_series_created_with_named_expressions_should_set_YField()
        {
            factory.PolarArea(xValueExpression: s => s.TotalSales, yValueExpression: s => s.RepSalesHigh);

            chart.Series[0].YField.ShouldEqual("RepSalesHigh");
        }

        private ChartSeriesBuilder<SalesData> CreateSeries()
        {
            return factory.PolarArea(s => s.TotalSales, s => s.RepSalesHigh);
        }
    }
}