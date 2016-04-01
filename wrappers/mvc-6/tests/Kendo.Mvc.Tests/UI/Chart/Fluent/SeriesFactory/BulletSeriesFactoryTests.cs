using Xunit;
using Kendo.Mvc.UI.Fluent;

namespace Kendo.Mvc.UI.Tests
{
    public class BulletSeriesFactoryTests
    {
        private readonly Chart<SalesData> chart;
        private readonly ChartSeriesFactory<SalesData> factory;

        public BulletSeriesFactoryTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
            factory = new ChartSeriesFactory<SalesData>(chart.Series);
        }

        [Fact]
        public void Bullet_series_with_custom_data_should_set_Type()
        {
            factory.Bullet(new int[] { });

            chart.Series[0].Type.ShouldEqual("bullet");
        }

        [Fact]
        public void Bullet_series_with_custom_data_should_set_series_data()
        {
            var data = new int[] { 1, 2, 3 };

            factory.Bullet(data);

            chart.Series[0].Data.ShouldBeSameAs(data);
        }

        [Fact]
        public void Bullet_series_with_custom_data_should_return_builder()
        {
            var builder = factory.Bullet(new int[] { });

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void Bullet_series_should_set_Name()
        {
            CreateSeries().Name("customName");

            chart.Series[0].Name.ShouldEqual("customName");
        }

        [Fact]
        public void Bullet_series_created_with_members_should_set_Name()
        {
            factory.Bullet("TotalSales", "RepSales");

            chart.Series[0].Name.ShouldEqual("Total Sales, Rep Sales");
        }

        [Fact]
        public void Bullet_series_created_with_expression_should_set_Type()
        {
            CreateSeries();

            chart.Series[0].Type.ShouldEqual("bullet");
        }

        [Fact]
        public void Bullet_series_created_with_expression_should_not_set_Name()
        {
            CreateSeries();

            chart.Series[0].Name.ShouldEqual(null);
        }

        [Fact]
        public void Bullet_series_created_with_expression_should_set_CurrentField()
        {
            CreateSeries();

            chart.Series[0].CurrentField.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Bullet_series_created_with_expression_should_set_TargetField()
        {
            CreateSeries();

            chart.Series[0].TargetField.ShouldEqual("RepSales");
        }

        [Fact]
        public void Bullet_series_created_with_expression_should_return_builder()
        {
            var builder = CreateSeries();

            builder.ShouldBeType(typeof(ChartSeriesBuilder<SalesData>));
        }

        [Fact]
        public void Bullet_series_created_with_category_expression_should_set_Type()
        {
            CreateSeries();

            chart.Series[0].Type.ShouldEqual("bullet");
        }

        [Fact]
        public void Bullet_series_created_with_named_expressions_should_set_CurrentField()
        {
            factory.Bullet(currentExpression: s => s.TotalSales, targetExpression: category => category.RepSales);

            chart.Series[0].CurrentField.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Bullet_series_created_with_named_expression_should_set_TargetField()
        {
            factory.Bullet(currentExpression: s => s.TotalSales, targetExpression: category => category.RepSales);

            chart.Series[0].TargetField.ShouldEqual("RepSales");
        }
        
        private ChartSeriesBuilder<SalesData> CreateSeries()
        {
            return factory.Bullet(s => s.TotalSales, s => s.RepSales);
        }
    }
}