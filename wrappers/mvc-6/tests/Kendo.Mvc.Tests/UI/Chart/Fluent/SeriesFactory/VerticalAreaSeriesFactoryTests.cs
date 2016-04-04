using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;

namespace Kendo.Mvc.UI.Tests
{
    public class VerticalAreaSeriesFactoryTests
    {
        private readonly Chart<SalesData> chart;
        private readonly ChartSeriesFactory<SalesData> factory;

        public VerticalAreaSeriesFactoryTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
            factory = new ChartSeriesFactory<SalesData>(chart.Series);
        }

        [Fact]
        public void VerticalArea_series_with_custom_data_should_set_Type()
        {
            factory.VerticalArea(new int[] { });

            chart.Series[0].Type.ShouldEqual("verticalArea");
        }

        [Fact]
        public void VerticalArea_series_with_custom_data_should_set_series_data()
        {
            var data = new int[] { 1, 2, 3 };

            factory.VerticalArea(data);

            chart.Series[0].Data.ShouldBeSameAs(data);
        }

        [Fact]
        public void VerticalArea_series_with_custom_data_should_return_builder()
        {
            var builder = factory.VerticalArea(new int[] { });

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void VerticalArea_series_with_expression_should_set_XField()
        {
            CreateSeries();

            chart.Series[0].Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void VerticalArea_series_with_expression_should_set_YField()
        {
            CreateSeries();

            chart.Series[0].CategoryField.ShouldEqual("RepSalesHigh");
        }


        [Fact]
        public void VerticalArea_series_with_expression_should_set_Type()
        {
            CreateSeries();

            chart.Series[0].Type.ShouldEqual("verticalArea");
        }

        [Fact]
        public void VerticalArea_series_with_members_should_set_Name()
        {
            factory.VerticalArea("TotalSales", "RepSalesHigh");

            chart.Series[0].Name.ShouldEqual("Total Sales");
        }

        [Fact]
        public void VerticalArea_series_with_expression_should_not_set_Name()
        {
            CreateSeries();

            chart.Series[0].Name.ShouldEqual(null);
        }

        [Fact]
        public void VerticalArea_series_with_custom_name_should_override_default_Name()
        {
            CreateSeries().Name("customName");

            chart.Series[0].Name.ShouldEqual("customName");
        }

        [Fact]
        public void VerticalArea_series_with_expression_should_return_builder()
        {
            var builder = CreateSeries();

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void VerticalArea_series_created_with_named_expression_should_set_XField()
        {
            factory.VerticalArea(expression: s => s.TotalSales, categoryExpression: s => s.RepSalesHigh);

            chart.Series[0].Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void VerticalArea_series_created_with_named_expressions_should_set_YField()
        {
            factory.VerticalArea(expression: s => s.TotalSales, categoryExpression: s => s.RepSalesHigh);

            chart.Series[0].CategoryField.ShouldEqual("RepSalesHigh");
        }

        private ChartSeriesBuilder<SalesData> CreateSeries()
        {
            return factory.VerticalArea(s => s.TotalSales, s => s.RepSalesHigh);
        }
    }
}