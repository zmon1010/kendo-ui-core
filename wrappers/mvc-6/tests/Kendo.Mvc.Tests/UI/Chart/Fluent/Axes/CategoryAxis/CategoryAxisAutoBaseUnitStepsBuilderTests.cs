using Xunit;
using Kendo.Mvc.UI.Fluent;

namespace Kendo.Mvc.UI.Tests
{
    public class CategoryAxisAutoBaseUnitStepsBuilderTests
    {
        private readonly ChartCategoryAxisAutoBaseUnitStepsSettings<SalesData> autoBaseUnitSteps;
        private readonly ChartCategoryAxisAutoBaseUnitStepsSettingsBuilder<SalesData> builder;

        public CategoryAxisAutoBaseUnitStepsBuilderTests()
        {
            autoBaseUnitSteps = new ChartCategoryAxisAutoBaseUnitStepsSettings<SalesData>();
            builder = new ChartCategoryAxisAutoBaseUnitStepsSettingsBuilder<SalesData>(autoBaseUnitSteps);
        }

        [Fact]
        public void Builder_should_set_Seconds()
        {
            var value = new int[] { 1, 2, 3 };

            builder.Seconds(value);

            autoBaseUnitSteps.Seconds.ShouldEqual<object>(value);
        }

        [Fact]
        public void Seconds_should_return_builder()
        {
            builder.Seconds(1, 2, 3).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Minutes()
        {
            var value = new int[] { 1, 2, 3 };

            builder.Minutes(value);

            autoBaseUnitSteps.Minutes.ShouldEqual<object>(value);
        }

        [Fact]
        public void Minutes_should_return_builder()
        {
            builder.Minutes(1, 2, 3).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Hours()
        {
            var value = new int[] { 1, 2, 3 };

            builder.Hours(value);

            autoBaseUnitSteps.Hours.ShouldEqual<object>(value);
        }

        [Fact]
        public void Hours_should_return_builder()
        {
            builder.Hours(1, 2, 3).ShouldBeSameAs(builder);
        }


        [Fact]
        public void Builder_should_set_Days()
        {
            var value = new int[] { 1, 2, 3 };

            builder.Days(value);

            autoBaseUnitSteps.Days.ShouldEqual<object>(value);
        }

        [Fact]
        public void Days_should_return_builder()
        {
            builder.Days(1, 2, 3).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Weeks()
        {
            var value = new int[] { 1, 2, 3 };

            builder.Weeks(value);

            autoBaseUnitSteps.Weeks.ShouldEqual<object>(value);
        }

        [Fact]
        public void Weeks_should_return_builder()
        {
            builder.Weeks(1, 2, 3).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Months()
        {
            var value = new int[] { 1, 2, 3 };

            builder.Months(value);

            autoBaseUnitSteps.Months.ShouldEqual<object>(value);
        }

        [Fact]
        public void Months_should_return_builder()
        {
            builder.Months(1, 2, 3).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Years()
        {
            var value = new int[] { 1, 2, 3 };

            builder.Years(value);

            autoBaseUnitSteps.Years.ShouldEqual<object>(value);
        }

        [Fact]
        public void Years_should_return_builder()
        {
            builder.Years(1, 2, 3).ShouldBeSameAs(builder);
        }
    }
}