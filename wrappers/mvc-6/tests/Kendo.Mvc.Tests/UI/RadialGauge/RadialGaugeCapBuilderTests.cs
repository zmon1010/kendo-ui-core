namespace Kendo.Mvc.UI.Tests.RadialGauge
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class RadialGaugeCapBuilderTests
    {
        private readonly RadialGaugePointerCapSettings cap;
        private readonly RadialGaugePointerCapSettingsBuilder builder;

        public RadialGaugeCapBuilderTests()
        {
            cap = new RadialGaugePointerCapSettings();
            builder = new RadialGaugePointerCapSettingsBuilder(cap);
        }

        [Fact]
        public void Color_sets_color()
        {
            builder.Color("Red");
            cap.Color.ShouldEqual("Red");
        }

        [Fact]
        public void Opacity_sets_Opacity()
        {
            builder.Opacity(0.5);
            cap.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Size_sets_Size()
        {
            builder.Size(0.5);
            cap.Size.ShouldEqual(0.5);
        }
    }
}
