using Xunit;
using Kendo.Mvc.UI.Fluent;

namespace Kendo.Mvc.UI.Tests
{
    public class VerticalBulletSeriesFactoryTests
    {
        private readonly Chart<SalesData> chart;
        private readonly ChartSeriesFactory<SalesData> factory;

        public VerticalBulletSeriesFactoryTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
            factory = new ChartSeriesFactory<SalesData>(chart.Series);
        }

        [Fact]
        public void VerticalBullet_series_with_custom_data_should_set_Type()
        {
            factory.VerticalBullet(new int[] { });

            chart.Series[0].Type.ShouldEqual("verticalBullet");
        }

        [Fact]
        public void VerticalBullet_series_with_custom_data_should_set_series_data()
        {
            var data = new int[] { 1, 2, 3 };

            factory.VerticalBullet(data);

            chart.Series[0].Data.ShouldBeSameAs(data);
        }

        [Fact]
        public void VerticalBullet_series_with_custom_data_should_return_builder()
        {
            var builder = factory.VerticalBullet(new int[] { });

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void VerticalBullet_series_should_set_Name()
        {
            CreateSeries().Name("customName");

            chart.Series[0].Name.ShouldEqual("customName");
        }

        [Fact]
        public void VerticalBullet_series_created_with_members_should_set_Name()
        {
            factory.VerticalBullet("TotalSales", "RepSales");

            chart.Series[0].Name.ShouldEqual("Total Sales, Rep Sales");
        }

        [Fact]
        public void VerticalBullet_series_created_with_expression_should_set_Type()
        {
            CreateSeries();

            chart.Series[0].Type.ShouldEqual("verticalBullet");
        }

        [Fact]
        public void VerticalBullet_series_created_with_expression_should_not_set_Name()
        {
            CreateSeries();

            chart.Series[0].Name.ShouldEqual(null);
        }

        [Fact]
        public void VerticalBullet_series_created_with_expression_should_set_CurrentField()
        {
            CreateSeries();

            chart.Series[0].CurrentField.ShouldEqual("TotalSales");
        }

        [Fact]
        public void VerticalBullet_series_created_with_expression_should_set_TargetField()
        {
            CreateSeries();

            chart.Series[0].TargetField.ShouldEqual("RepSales");
        }

        [Fact]
        public void VerticalBullet_series_created_with_expression_should_return_builder()
        {
            var builder = CreateSeries();

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void VerticalBullet_series_created_with_category_expression_should_set_Type()
        {
            CreateSeries();

            chart.Series[0].Type.ShouldEqual("verticalBullet");
        }

        [Fact]
        public void VerticalBullet_series_created_with_named_expressions_should_set_CurrentField()
        {
            factory.VerticalBullet(currentExpression: s => s.TotalSales, targetExpression: category => category.RepSales);

            chart.Series[0].CurrentField.ShouldEqual("TotalSales");
        }

        [Fact]
        public void VerticalBullet_series_created_with_named_expression_should_set_TargetField()
        {
            factory.VerticalBullet(currentExpression: s => s.TotalSales, targetExpression: category => category.RepSales);

            chart.Series[0].TargetField.ShouldEqual("RepSales");
        }
        
        private ChartSeriesBuilder<SalesData> CreateSeries()
        {
            return factory.VerticalBullet(s => s.TotalSales, s => s.RepSales);
        }
    }
}