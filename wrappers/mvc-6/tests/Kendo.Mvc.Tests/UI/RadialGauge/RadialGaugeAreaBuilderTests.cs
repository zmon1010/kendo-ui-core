namespace Kendo.Mvc.UI.Tests.RadialGauge
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class RadialGaugeAreaBuilderTests
    {
        private readonly RadialGaugeGaugeAreaSettingsBuilder builder;
        private readonly RadialGaugeGaugeAreaSettings gaugeArea;

        public RadialGaugeAreaBuilderTests()
        {
            gaugeArea = new RadialGaugeGaugeAreaSettings();
            builder = new RadialGaugeGaugeAreaSettingsBuilder(gaugeArea);
        }

        [Fact]
        public void Background_sets_background()
        {
            builder.Background("Red");
            gaugeArea.Background.ShouldEqual("Red");
        }

        [Fact]
        public void Margin_sets_margins()
        {
            builder.Margin(20);
            gaugeArea.Margin.Top.ShouldEqual(20);
            gaugeArea.Margin.Right.ShouldEqual(20);
            gaugeArea.Margin.Bottom.ShouldEqual(20);
            gaugeArea.Margin.Left.ShouldEqual(20);

            builder.Margin(0, 1, 2, 3);
            gaugeArea.Margin.Top.ShouldEqual(0);
            gaugeArea.Margin.Right.ShouldEqual(1);
            gaugeArea.Margin.Bottom.ShouldEqual(2);
            gaugeArea.Margin.Left.ShouldEqual(3);
        }

        [Fact]
        public void Border_sets_width_and_color()
        {
            builder.Border(1, "red", ChartDashType.Dot);
            gaugeArea.Border.Color.ShouldEqual("red");
            gaugeArea.Border.Width.ShouldEqual(1);
            gaugeArea.Border.DashType.ShouldEqual(ChartDashType.Dot);
        }

        [Fact]
        public void Border_builder_should_configure_border()
        {
            builder.Border(b => b.Opacity(0.5));
            gaugeArea.Border.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Border_builder_should_return_builder()
        {
            builder.Border(b => b.Opacity(0.5)).ShouldBeSameAs(builder);
        }
    }
}