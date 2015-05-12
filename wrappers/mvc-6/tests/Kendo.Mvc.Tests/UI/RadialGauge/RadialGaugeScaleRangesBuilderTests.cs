namespace Kendo.Mvc.UI.Tests.RadialGauge
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class RadialGaugeScaleRangesBuilderTests
    {
        private readonly RadialGaugeScaleSettingsRange ranges;
        private readonly RadialGaugeScaleSettingsRangeBuilder builder;

        public RadialGaugeScaleRangesBuilderTests()
        {
            ranges = new RadialGaugeScaleSettingsRange();
            builder = new RadialGaugeScaleSettingsRangeBuilder(ranges);
        }

        [Fact]
        public void Color_should_set_color()
        {
            builder.Color("color");
            ranges.Color.ShouldEqual("color");
        }

        [Fact]
        public void To_should_set_to()
        {
            builder.To(2);
            ranges.To.ShouldEqual(2.0);
        }

        [Fact]
        public void From_should_set_from()
        {
            builder.From(2);
            ranges.From.ShouldEqual(2.0);
        }

        [Fact]
        public void Opacity_should_set_opacity()
        {
            builder.Opacity(0.22);
            ranges.Opacity.ShouldEqual(0.22);
        }
    }
}