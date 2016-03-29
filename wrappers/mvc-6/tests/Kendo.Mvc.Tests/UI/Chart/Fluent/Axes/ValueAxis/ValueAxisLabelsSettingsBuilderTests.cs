using Xunit;
using Kendo.Mvc.UI.Fluent;

namespace Kendo.Mvc.UI.Tests
{
    public class ValueAxisLabelsSettingsBuilderTests
    {

        private readonly ChartValueAxisLabelsSettings<SalesData> settings;
        private readonly ChartValueAxisLabelsSettingsBuilder<SalesData> builder;

        public ValueAxisLabelsSettingsBuilderTests()
        {
            settings = new ChartValueAxisLabelsSettings<SalesData>();
            builder = new ChartValueAxisLabelsSettingsBuilder<SalesData>(settings);
        }

        [Fact]
        public void Builder_should_set_Margin()
        {
            builder.Margin(1, 2, 3, 4); ;

            settings.Margin.Top.ShouldEqual(1);
            settings.Margin.Right.ShouldEqual(2);
            settings.Margin.Bottom.ShouldEqual(3);
            settings.Margin.Left.ShouldEqual(4);
        }

        [Fact]
        public void Margin_should_return_builder()
        {
            builder.Margin(1, 2, 3, 4).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Padding()
        {
            builder.Padding(1, 2, 3, 4); ;

            settings.Padding.Top.ShouldEqual(1);
            settings.Padding.Right.ShouldEqual(2);
            settings.Padding.Bottom.ShouldEqual(3);
            settings.Padding.Left.ShouldEqual(4);
        }

        [Fact]
        public void Padding_should_return_builder()
        {
            builder.Padding(1, 2, 3, 4).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Rotation_with_double_value()
        {
            var value = 1.23;

            builder.Rotation(value);

            settings.Rotation.Angle.ShouldEqual(value);
        }

        [Fact]
        public void Rotation_with_double_value_should_return_builder()
        {
            builder.Rotation(1.23).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Rotation_with_string_value()
        {
            var value = 1.2;

            builder.Rotation(value);

            settings.Rotation.Angle.ShouldEqual(value);
        }

        [Fact]
        public void Rotation_with_string_value_should_return_builder()
        {
            builder.Rotation(1.2).ShouldBeSameAs(builder);
        }
    }
}
