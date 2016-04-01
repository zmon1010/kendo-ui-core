using Xunit;
using Kendo.Mvc.UI.Fluent;

namespace Kendo.Mvc.UI.Tests
{
    public class BarSeriesFactoryTests
    {
        private readonly Chart<SalesData> chart;
        private readonly ChartSeriesFactory<SalesData> factory;

        public BarSeriesFactoryTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
            factory = new ChartSeriesFactory<SalesData>(chart.Series);
        }

        [Fact]
        public void Bar_series_with_custom_data_should_set_Type()
        {
            factory.Bar(new int[] { });

            chart.Series[0].Type.ShouldEqual("bar");
        }

        [Fact]
        public void Bar_series_with_custom_data_should_set_series_data()
        {
            var data = new int[] { 1, 2, 3 };

            factory.Bar(data);

            chart.Series[0].Data.ShouldBeSameAs(data);
        }

        [Fact]
        public void Bar_series_created_with_named_expression_should_set_Field()
        {
            factory.Bar(valueExpression: s => s.TotalSales);

            chart.Series[0].Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Bar_series_with_custom_data_should_return_builder()
        {
            var builder = factory.Bar(new int[] { });

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void Bar_series_created_with_expression_should_set_Type()
        {
            factory.Bar(s => s.TotalSales);

            chart.Series[0].Type.ShouldEqual("bar");
        }

        [Fact]
        public void Bar_series_created_with_members_should_set_Name()
        {
            factory.Bar("TotalSales");

            chart.Series[0].Name.ShouldEqual("Total Sales");
        }

        [Fact]
        public void Bar_series_created_with_expression_should_not_set_Name()
        {
            factory.Bar(s => s.TotalSales);

            chart.Series[0].Name.ShouldEqual(null);
        }
                
        [Fact]
        public void Bar_series_should_set_Name()
        {
            factory.Bar(s => s.TotalSales).Name("customName");

            chart.Series[0].Name.ShouldEqual("customName");
        }

        [Fact]
        public void Bar_series_created_with_expression_should_set_Field()
        {
            factory.Bar(s => s.TotalSales);

            chart.Series[0].Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Bar_series_created_with_expression_should_not_set_CategoryField()
        {
            factory.Bar(s => s.TotalSales);

            chart.Series[0].CategoryField.ShouldEqual(null);
        }

        [Fact]
        public void Bar_series_created_with_expression_should_return_builder()
        {
            var builder = factory.Bar(s => s.TotalSales);

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void Bar_series_created_with_category_expression_should_set_Type()
        {
            factory.Bar(s => s.TotalSales, category => category.RepName);

            chart.Series[0].Type.ShouldEqual("bar");
        }

        [Fact]
        public void Bar_series_created_with_category_expression_should_set_Name()
        {
            factory.Bar(s => s.TotalSales, category => category.RepName);

            chart.Series[0].Name.ShouldEqual(null);
        }

        [Fact]
        public void Bar_series_created_with_category_expression_should_set_Field()
        {
            factory.Bar(s => s.TotalSales, category => category.RepName);

            chart.Series[0].Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Bar_series_created_with_category_expression_should_set_CategoryField()
        {
            factory.Bar(s => s.TotalSales, category => category.RepName);

            chart.Series[0].CategoryField.ShouldEqual("RepName");
        }

        [Fact]
        public void Bar_series_created_with_named_expressions_should_set_CategoryField()
        {
            factory.Bar(valueExpression: s => s.TotalSales, categoryExpression: category => category.RepName);

            chart.Series[0].CategoryField.ShouldEqual("RepName");
        }

        [Fact]
        public void Bar_series_created_with_category_expression_should_return_builder()
        {
            var builder = factory.Bar(s => s.TotalSales, category => category.RepName);

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }
    }
}