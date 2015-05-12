namespace Kendo.Mvc.UI.Tests
{
    using Moq;
    using Xunit;
    using System.Collections.Generic;

    public class LinearGaugeScaleSerializationTests
    {
        private readonly LinearGaugeScaleSettings scale;

        public LinearGaugeScaleSerializationTests()
        {
            scale = new LinearGaugeScaleSettings();
        }

        [Fact]
        public void Should_serialize_labels()
        {
            scale.Labels.Color = "red";
            scale.Serialize().ContainsKey("labels").ShouldBeTrue();
        }

        [Fact]
        public void Should_serialize_Mirror()
        {
            scale.Mirror = true;
            scale.Serialize()["mirror"].ShouldEqual(true);
        }

        [Fact]
        public void Should_not_serialize_default_Mirror()
        {
            scale.Serialize().ContainsKey("mirror").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Vertical()
        {
            scale.Vertical = true;
            scale.Serialize()["vertical"].ShouldEqual(true);
        }

        [Fact]
        public void Should_not_serialize_default_Vertical()
        {
            scale.Serialize().ContainsKey("vertical").ShouldBeFalse();
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
            var data = new List<LinearGaugeScaleSettingsRange>();
            data.Add(new LinearGaugeScaleSettingsRange() { Color = "red" });
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