using Xunit;
using Kendo.Mvc.UI.Fluent;

namespace Kendo.Mvc.UI.Tests
{
    public class RadarAreaSeriesFactoryTests
    {
        private readonly Chart<SalesData> chart;
        private readonly ChartSeriesFactory<SalesData> factory;

        public RadarAreaSeriesFactoryTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
            factory = new ChartSeriesFactory<SalesData>(chart.Series);
        }

        [Fact]
        public void RadarArea_series_with_custom_data_should_set_Type()
        {
            factory.RadarArea(new int[] { });

            chart.Series[0].Type.ShouldEqual("radarArea");
        }

        [Fact]
        public void RadarArea_series_with_custom_data_should_set_series_data()
        {
            var data = new int[] { 1, 2, 3 };

            factory.RadarArea(data);

            chart.Series[0].Data.ShouldBeSameAs(data);
        }

        [Fact]
        public void RadarArea_series_with_custom_data_should_return_builder()
        {
            var builder = factory.RadarArea(new int[] { });

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void RadarArea_series_created_with_expression_should_set_Type()
        {
            factory.RadarArea(s => s.TotalSales);

            chart.Series[0].Type.ShouldEqual("radarArea");
        }

        [Fact]
        public void RadarArea_series_created_with_members_should_set_Name()
        {
            factory.RadarArea("TotalSales");

            chart.Series[0].Name.ShouldEqual("Total Sales");
        }

        [Fact]
        public void RadarArea_series_created_with_expression_should_not_set_Name()
        {
            CreateSeries();

            chart.Series[0].Name.ShouldEqual(null);
        }
                
        [Fact]
        public void RadarArea_series_should_set_Name()
        {
            CreateSeries().Name("customName");

            chart.Series[0].Name.ShouldEqual("customName");
        }

        [Fact]
        public void RadarArea_series_created_with_expression_should_set_Field()
        {
            factory.RadarArea(s => s.TotalSales);

            chart.Series[0].Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void RadarArea_series_created_with_expression_should_not_set_CategoryField()
        {
            factory.RadarArea(s => s.TotalSales);

            chart.Series[0].CategoryField.ShouldEqual(null);
        }

        [Fact]
        public void RadarArea_series_created_with_expression_should_return_builder()
        {
            var builder = factory.RadarArea(s => s.TotalSales);

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void RadarArea_series_created_with_category_expression_should_set_Type()
        {
            CreateSeries();

            chart.Series[0].Type.ShouldEqual("radarArea");
        }

        [Fact]
        public void RadarArea_series_created_with_category_expression_should_set_Name()
        {
            CreateSeries();

            chart.Series[0].Name.ShouldEqual(null);
        }

        [Fact]
        public void RadarArea_series_created_with_category_expression_should_set_Field()
        {
            CreateSeries();

            chart.Series[0].Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void RadarArea_series_created_with_category_expression_should_set_CategoryField()
        {
            CreateSeries();

            chart.Series[0].CategoryField.ShouldEqual("RepName");
        }
                
        [Fact]
        public void RadarArea_series_created_with_named_expression_should_set_Field()
        {
            factory.RadarArea(valueExpression: s => s.TotalSales, categoryExpression: s => s.RepName);

            chart.Series[0].Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void RadarArea_series_created_with_named_expressions_should_set_CategoryField()
        {
            factory.RadarArea(valueExpression: s => s.TotalSales, categoryExpression: s => s.RepName);

            chart.Series[0].CategoryField.ShouldEqual("RepName");
        }

        [Fact]
        public void RadarArea_series_created_with_category_expression_should_return_builder()
        {
            var builder = CreateSeries();

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        private ChartSeriesBuilder<SalesData> CreateSeries()
        {
            return factory.RadarArea(s => s.TotalSales, s => s.RepName);
        }
    }
}