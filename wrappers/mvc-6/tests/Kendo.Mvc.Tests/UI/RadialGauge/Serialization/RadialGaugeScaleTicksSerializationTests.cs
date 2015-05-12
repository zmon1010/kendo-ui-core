namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;

    public class RadialGaugeScaleTicksSerializationTests
    {
        private readonly RadialGaugeScaleMajorTicksSettings majorTicks;
        private readonly RadialGaugeScaleMinorTicksSettings minorTicks;

        public RadialGaugeScaleTicksSerializationTests()
        {
            majorTicks = new RadialGaugeScaleMajorTicksSettings();
            minorTicks = new RadialGaugeScaleMinorTicksSettings();
        }

        [Fact]
        public void Serializes_size()
        {
            majorTicks.Size = 1d;
            minorTicks.Size = 1d;

            GetMajorTickJson()["size"].ShouldEqual(1d);
            GetMinorTickJson()["size"].ShouldEqual(1d);
        }

        [Fact]
        public void Does_not_serialize_default_size()
        {
            GetMajorTickJson().ContainsKey("size").ShouldBeFalse();
            GetMinorTickJson().ContainsKey("size").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_width()
        {
            majorTicks.Width = 1d;
            minorTicks.Width = 1d;

            GetMajorTickJson()["width"].ShouldEqual(1d);
            GetMinorTickJson()["width"].ShouldEqual(1d);
        }

        [Fact]
        public void Does_not_serialize_default_width()
        {
            GetMajorTickJson().ContainsKey("width").ShouldBeFalse();
            GetMinorTickJson().ContainsKey("width").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_dash_type()
        {
            majorTicks.DashType = ChartDashType.Dot;
            minorTicks.DashType = ChartDashType.Dot;

            GetMajorTickJson()["dashType"].ShouldEqual("dot");
            GetMinorTickJson()["dashType"].ShouldEqual("dot");
        }

        [Fact]
        public void Does_not_serialize_default_dash_type()
        {
            GetMajorTickJson().ContainsKey("dashType").ShouldBeFalse();
            GetMinorTickJson().ContainsKey("dashType").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_color()
        {
            majorTicks.Color = "red";
            minorTicks.Color = "red";

            GetMajorTickJson()["color"].ShouldEqual("red");
            GetMinorTickJson()["color"].ShouldEqual("red");
        }

        [Fact]
        public void Does_not_serialize_default_color()
        {
            GetMajorTickJson().ContainsKey("color").ShouldBeFalse();
            GetMinorTickJson().ContainsKey("color").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_visible()
        {
            majorTicks.Visible = false;
            minorTicks.Visible = false;

            GetMajorTickJson()["visible"].ShouldEqual(false);
            GetMinorTickJson()["visible"].ShouldEqual(false);
        }

        [Fact]
        public void Does_not_serialize_visible()
        {
            GetMajorTickJson().ContainsKey("visible").ShouldBeFalse();
            GetMinorTickJson().ContainsKey("visible").ShouldBeFalse();
        }

        private IDictionary<string, object> GetMajorTickJson()
        {
            return majorTicks.Serialize();
        }

        private IDictionary<string, object> GetMinorTickJson()
        {
            return minorTicks.Serialize();
        }
    }
}
