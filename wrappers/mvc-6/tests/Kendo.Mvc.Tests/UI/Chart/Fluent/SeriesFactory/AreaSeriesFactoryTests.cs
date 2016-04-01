using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;

namespace Kendo.Mvc.UI.Tests
{
    public class AreaSeriesFactoryTests
    {
        private readonly Chart<SalesData> chart;
        private readonly ChartSeriesFactory<SalesData> factory;

        public AreaSeriesFactoryTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
            factory = new ChartSeriesFactory<SalesData>(chart.Series);
        }

        [Fact]
        public void Area_series_with_custom_data_should_set_Type()
        {
            factory.Area(new int[] { });

            chart.Series[0].Type.ShouldEqual("area");
        }

        [Fact]
        public void Area_series_with_custom_data_should_set_series_data()
        {
            var data = new int[] { 1, 2, 3 };

            factory.Area(data);

            chart.Series[0].Data.ShouldBeSameAs(data);
        }

        [Fact]
        public void Area_series_created_with_named_expression_should_set_field()
        {
            factory.Area(expression: s => s.TotalSales);

            chart.Series[0].Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Area_series_with_custom_data_should_return_builder()
        {
            var builder = factory.Area(new int[] { });

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void Area_series_created_with_expression_should_set_Type()
        {
            factory.Area(s => s.TotalSales);

            chart.Series[0].Type.ShouldEqual("area");
        }

        [Fact]
        public void Area_series_created_with_expression_should_not_set_Name()
        {
            factory.Area(s => s.TotalSales);

            chart.Series[0].Name.ShouldEqual(null);
        }
                
        [Fact]
        public void Area_series_with_custom_name_should_override_default_Name()
        {
            factory.Area(s => s.TotalSales).Name("customName");

            chart.Series[0].Name.ShouldEqual("customName");
        }

        [Fact]
        public void Area_series_created_with_expression_should_set_field()
        {
            factory.Area(s => s.TotalSales);

            chart.Series[0].Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Area_series_created_with_expression_should_not_set_categoryField()
        {
            factory.Area(s => s.TotalSales);

            chart.Series[0].CategoryField.ShouldEqual(null);
        }

        [Fact]
        public void Area_series_created_with_expression_should_return_builder()
        {
            var builder = factory.Area(s => s.TotalSales);

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void Area_series_created_with_category_expression_should_set_Type()
        {
            factory.Area(s => s.TotalSales, category => category.RepName);

            chart.Series[0].Type.ShouldEqual("area");
        }

        [Fact]
        public void Area_series_created_with_category_expression_should_set_Name()
        {
            factory.Area(s => s.TotalSales, category => category.RepName);

            chart.Series[0].Name.ShouldEqual(null);
        }

        [Fact]
        public void Area_series_created_with_category_expression_should_set_field()
        {
            factory.Area(s => s.TotalSales, category => category.RepName);

            chart.Series[0].Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Area_series_created_with_category_expression_should_set_categoryField()
        {
            factory.Area(s => s.TotalSales, category => category.RepName);

            chart.Series[0].CategoryField.ShouldEqual("RepName");
        }

        [Fact]
        public void Area_series_created_with_named_optional_expression_should_set_categoryField()
        {
            factory.Area(expression: s => s.TotalSales, categoryExpression: category => category.RepName);

            chart.Series[0].CategoryField.ShouldEqual("RepName");
        }

        [Fact]
        public void Area_series_created_with_category_expression_should_return_builder()
        {
            var builder = factory.Area(s => s.TotalSales, category => category.RepName);

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }
    }
}