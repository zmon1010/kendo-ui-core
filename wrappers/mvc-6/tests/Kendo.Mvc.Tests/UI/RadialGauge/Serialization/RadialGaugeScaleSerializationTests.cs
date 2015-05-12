namespace Kendo.Mvc.UI.Tests
{
    using Moq;
    using Xunit;
    using System.Collections.Generic;

    public class RadialGaugeScaleSerializationTests
    {
        private readonly RadialGaugeScaleSettings scale;

        public RadialGaugeScaleSerializationTests()
        {
            scale = new RadialGaugeScaleSettings();
        }

        [Fact]
        public void Should_serialize_labels()
        {
            scale.Labels.Color = "red";
            scale.Serialize().ContainsKey("labels").ShouldBeTrue();
        }

        [Fact]
        public void Should_serialize_StartAngle()
        {
            scale.StartAngle = 1.1;
            scale.Serialize()["startAngle"].ShouldEqual(1.1);
        }

        [Fact]
        public void Should_not_serialize_default_StartAngle()
        {
            scale.Serialize().ContainsKey("startAngle").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_EndAngle()
        {
            scale.EndAngle = 1.1;
            scale.Serialize()["endAngle"].ShouldEqual(1.1);
        }

        [Fact]
        public void Should_not_serialize_default_EndAngle()
        {
            scale.Serialize().ContainsKey("endAngle").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_RangeSize()
        {
            scale.RangeSize = 1.1;
            scale.Serialize()["rangeSize"].ShouldEqual(1.1);
        }

        [Fact]
        public void Should_not_serialize_default_RangeSize()
        {
            scale.Serialize().ContainsKey("rangeSize").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_RangeDistance()
        {
            scale.RangeDistance = 1.1;
            scale.Serialize()["rangeDistance"].ShouldEqual(1.1);
        }

        [Fact]
        public void Should_not_serialize_default_RangeDistance()
        {
            scale.Serialize().ContainsKey("rangeDistance").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_MajorUnit()
        {
            scale.MajorUnit = 1.1;
            scale.Serialize()["majorUnit"].ShouldEqual(1.1);
        }

        [Fact]
        public void Should_not_serialize_default_MajorUnit()
        {
            scale.Serialize().ContainsKey("majorUnit").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_MinorUnit()
        {
            scale.MinorUnit = 1.1;
            scale.Serialize()["minorUnit"].ShouldEqual(1.1);
        }

        [Fact]
        public void Should_not_serialize_default_MinorUnit()
        {
            scale.Serialize().ContainsKey("minorUnit").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Min()
        {
            scale.Min = 1.1;
            scale.Serialize()["min"].ShouldEqual(1.1);
        }

        [Fact]
        public void Should_not_serialize_default_Min()
        {
            scale.Serialize().ContainsKey("min").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Max()
        {
            scale.Max = 1.1;
            scale.Serialize()["max"].ShouldEqual(1.1);
        }

        [Fact]
        public void Should_not_serialize_default_Max()
        {
            scale.Serialize().ContainsKey("max").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_minorTicks()
        {
            scale.MinorTicks.Color = "red";
            scale.Serialize().ContainsKey("minorTicks").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_default_minorTicks()
        {
            scale.Serialize().ContainsKey("minorTicks").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_majorTicks()
        {
            scale.MajorTicks.Color = "red";
            scale.Serialize().ContainsKey("majorTicks").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_default_majorTicks()
        {
            scale.Serialize().ContainsKey("majorTicks").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_ranges()
        {
            var data = new List<RadialGaugeScaleSettingsRange>();
            data.Add(new RadialGaugeScaleSettingsRange() { Color = "red" });
            scale.Ranges = data;

            scale.Serialize().ContainsKey("ranges").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_default_ranges()
        {
            scale.Serialize().ContainsKey("ranges").ShouldBeFalse();
        }

        [Fact]
        public void Should_not_serialize_default_labels()
        {
            scale.Serialize().ContainsKey("labels").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Reverse()
        {
            scale.Reverse = true;
            scale.Serialize()["reverse"].ShouldEqual(true);
        }

        [Fact]
        public void Should_not_serialize_default_Reverse()
        {
            scale.Serialize().ContainsKey("reverse").ShouldBeFalse();
        }
    }
}
