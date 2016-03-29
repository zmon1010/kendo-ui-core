using Xunit;
using Kendo.Mvc.UI.Fluent;

namespace Kendo.Mvc.UI.Tests
{
    public class LineSeriesFactoryTests
    {
        private readonly Chart<SalesData> chart;
        private readonly ChartSeriesFactory<SalesData> factory;

        public LineSeriesFactoryTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
            factory = new ChartSeriesFactory<SalesData>(chart.Series);
        }

        [Fact]
        public void Line_series_with_custom_data_should_set_Type()
        {
            factory.Line(new int[] { });

            chart.Series[0].Type.ShouldEqual("line");
        }

        [Fact]
        public void Line_series_with_custom_data_should_set_series_data()
        {
            var data = new int[] { 1, 2, 3 };

            factory.Line(data);

            chart.Series[0].Data.ShouldBeSameAs(data);
        }

        [Fact]
        public void Line_series_created_with_named_expression_should_set_Field()
        {
            factory.Line(expression: s => s.TotalSales);

            chart.Series[0].Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Line_series_with_custom_data_should_return_builder()
        {
            var builder = factory.Line(new int[] { });

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void Line_series_created_with_expression_should_set_Type()
        {
            factory.Line(s => s.TotalSales);

            chart.Series[0].Type.ShouldEqual("line");
        }

        [Fact]
        public void Line_series_created_with_expression_should_set_Name()
        {
            factory.Line(s => s.TotalSales);

            chart.Series[0].Name.ShouldEqual("Total Sales");
        }
                
        [Fact]
        public void Line_series_should_set_Name()
        {
            factory.Line(s => s.TotalSales).Name("customName");

            chart.Series[0].Name.ShouldEqual("customName");
        }

        [Fact]
        public void Line_series_created_with_expression_should_set_Field()
        {
            factory.Line(s => s.TotalSales);

            chart.Series[0].Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Line_series_created_with_expression_should_not_set_CategoryField()
        {
            factory.Line(s => s.TotalSales);

            chart.Series[0].CategoryField.ShouldEqual(null);
        }

        [Fact]
        public void Line_series_created_with_expression_should_return_builder()
        {
            var builder = factory.Line(s => s.TotalSales);

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void Line_series_created_with_category_expression_should_set_Type()
        {
            factory.Line(s => s.TotalSales, category => category.RepName);

            chart.Series[0].Type.ShouldEqual("line");
        }

        [Fact]
        public void Line_series_created_with_category_expression_should_set_Name()
        {
            factory.Line(s => s.TotalSales, category => category.RepName);

            chart.Series[0].Name.ShouldEqual("Total Sales");
        }

        [Fact]
        public void Line_series_created_with_category_expression_should_set_Field()
        {
            factory.Line(s => s.TotalSales, category => category.RepName);

            chart.Series[0].Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Line_series_created_with_category_expression_should_set_CategoryField()
        {
            factory.Line(s => s.TotalSales, category => category.RepName);

            chart.Series[0].CategoryField.ShouldEqual("RepName");
        }

        [Fact]
        public void Line_series_created_with_named_expressions_should_set_CategoryField()
        {
            factory.Line(expression: s => s.TotalSales, categoryExpression: category => category.RepName);

            chart.Series[0].CategoryField.ShouldEqual("RepName");
        }

        [Fact]
        public void Line_series_created_with_category_expression_should_return_builder()
        {
            var builder = factory.Line(s => s.TotalSales, category => category.RepName);

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }
    }
}