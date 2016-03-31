using Xunit;
using Kendo.Mvc.UI.Fluent;

namespace Kendo.Mvc.UI.Tests
{
    public class ColumnSeriesFactoryTests
    {
        private readonly Chart<SalesData> chart;
        private readonly ChartSeriesFactory<SalesData> factory;

        public ColumnSeriesFactoryTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
            factory = new ChartSeriesFactory<SalesData>(chart.Series);
        }

        [Fact]
        public void Column_series_with_custom_data_should_set_Type()
        {
            factory.Column(new int[] { });

            chart.Series[0].Type.ShouldEqual("column");
        }

        [Fact]
        public void Column_series_with_custom_data_should_set_series_data()
        {
            var data = new int[] { 1, 2, 3 };

            factory.Column(data);

            chart.Series[0].Data.ShouldBeSameAs(data);
        }

        [Fact]
        public void Column_series_created_with_named_expression_should_set_field()
        {
            factory.Column(valueExpression: s => s.TotalSales);

            chart.Series[0].Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Column_series_with_custom_data_should_return_builder()
        {
            var builder = factory.Column(new int[] { });

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void Column_series_created_with_expression_should_set_Type()
        {
            factory.Column(s => s.TotalSales);

            chart.Series[0].Type.ShouldEqual("column");
        }

        [Fact]
        public void Column_series_created_with_expression_should_not_set_Name()
        {
            factory.Column(s => s.TotalSales);

            chart.Series[0].Name.ShouldEqual(null);
        }
                
        [Fact]
        public void Column_series_should_set_Name()
        {
            factory.Column(s => s.TotalSales).Name("customName");

            chart.Series[0].Name.ShouldEqual("customName");
        }

        [Fact]
        public void Column_series_created_with_expression_should_set_Field()
        {
            factory.Column(s => s.TotalSales);

            chart.Series[0].Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Column_series_created_with_expression_should_not_set_CategoryField()
        {
            factory.Column(s => s.TotalSales);

            chart.Series[0].CategoryField.ShouldEqual(null);
        }

        [Fact]
        public void Column_series_created_with_expression_should_return_builder()
        {
            var builder = factory.Column(s => s.TotalSales);

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void Column_series_created_with_category_expression_should_set_Type()
        {
            factory.Column(s => s.TotalSales, category => category.RepName);

            chart.Series[0].Type.ShouldEqual("column");
        }

        [Fact]
        public void Column_series_created_with_category_expression_should_set_Name()
        {
            factory.Column(s => s.TotalSales, category => category.RepName);

            chart.Series[0].Name.ShouldEqual(null);
        }

        [Fact]
        public void Column_series_created_with_category_expression_should_set_field()
        {
            factory.Column(s => s.TotalSales, category => category.RepName);

            chart.Series[0].Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Column_series_created_with_category_expression_should_set_CategoryField()
        {
            factory.Column(s => s.TotalSales, category => category.RepName);

            chart.Series[0].CategoryField.ShouldEqual("RepName");
        }

        [Fact]
        public void Column_series_created_with_named_expressions_should_set_CategoryField()
        {
            factory.Column(valueExpression: s => s.TotalSales, categoryExpression: category => category.RepName);

            chart.Series[0].CategoryField.ShouldEqual("RepName");
        }

        [Fact]
        public void Column_series_created_with_category_expression_should_return_builder()
        {
            var builder = factory.Column(s => s.TotalSales, category => category.RepName);

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }
    }
}