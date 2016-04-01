using Xunit;
using Kendo.Mvc.UI.Fluent;

namespace Kendo.Mvc.UI.Tests
{
    public class FunnelSeriesFactoryTests
    {
        private readonly Chart<SalesData> chart;
        private readonly ChartSeriesFactory<SalesData> factory;

        public FunnelSeriesFactoryTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
            factory = new ChartSeriesFactory<SalesData>(chart.Series);
        }

        [Fact]
        public void Funnel_series_with_custom_data_should_set_Type()
        {
            factory.Funnel(new int[] { });

            chart.Series[0].Type.ShouldEqual("funnel");
        }

        [Fact]
        public void Funnel_series_with_custom_data_should_set_series_data()
        {
            var data = new int[] { 1, 2, 3 };

            factory.Funnel(data);

            chart.Series[0].Data.ShouldBeSameAs(data);
        }

        [Fact]
        public void Funnel_series_with_custom_data_should_return_builder()
        {
            var builder = factory.Funnel(new int[] { });

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void Funnel_series_should_set_Name()
        {
            CreateSeries().Name("customName");

            chart.Series[0].Name.ShouldEqual("customName");
        }

        [Fact]
        public void Funnel_series_created_with_members_should_set_Name()
        {
            factory.Funnel("TotalSales", "RepName");

            chart.Series[0].Name.ShouldEqual("Total Sales");
        }

        [Fact]
        public void Funnel_series_created_with_expression_should_set_Type()
        {
            CreateSeries();

            chart.Series[0].Type.ShouldEqual("funnel");
        }

        [Fact]
        public void Funnel_series_created_with_expression_should_not_set_Name()
        {
            CreateSeries();

            chart.Series[0].Name.ShouldEqual(null);
        }

        [Fact]
        public void Funnel_series_created_with_expression_should_set_Field()
        {
            CreateSeries();

            chart.Series[0].Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Funnel_series_created_with_expression_should_return_builder()
        {
            var builder = CreateSeries();

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void Funnel_series_created_with_category_expression_should_set_Type()
        {
            CreateSeries();

            chart.Series[0].Type.ShouldEqual("funnel");
        }

        [Fact]
        public void Funnel_series_created_with_category_expression_should_set_CategoryField()
        {
            CreateSeries();

            chart.Series[0].CategoryField.ShouldEqual("RepName");
        }

        [Fact]
        public void Funnel_series_created_with_named_expression_should_set_Field()
        {
            factory.Funnel(expressionValue: s => s.TotalSales, categoryExpression: category => category.RepName);

            chart.Series[0].Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Funnel_series_created_with_named_expressions_should_set_CategoryField()
        {
            factory.Funnel(expressionValue: s => s.TotalSales, categoryExpression: category => category.RepName);

            chart.Series[0].CategoryField.ShouldEqual("RepName");
        }
        
        private ChartSeriesBuilder<SalesData> CreateSeries()
        {
            return factory.Funnel(s => s.TotalSales, s => s.RepName);
        }
    }
}