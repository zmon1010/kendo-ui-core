using Kendo.Mvc.Tests;
using Kendo.Mvc.UI.Fluent;
using Xunit;

namespace Kendo.Mvc.UI.Html.Tests
{
    public class MapLayerDefaultsMarkerSettingsTests
    {
        private readonly MapLayerDefaultsMarkerSettings settings;

        public MapLayerDefaultsMarkerSettingsTests()
        {
            settings = new MapLayerDefaultsMarkerSettings();
            settings.Map = new Map(TestHelper.CreateViewContext());
        }

        [Fact]
        public void Serializes_with_no_map()
        {
            settings.Map = null;
            settings.Serialize().ShouldNotBeNull();
        }

        [Fact]
        public void Serializes_shape_type()
        {
            settings.Shape = MapMarkersShape.Pin;
            settings.Serialize()["shape"].ShouldEqual("pin");
        }

        [Fact]
        public void Serializes_compound_shape_type()
        {
            settings.Shape = MapMarkersShape.PinTarget;
            settings.Serialize()["shape"].ShouldEqual("pinTarget");
        }

        [Fact]
        public void Serializes_shape_name()
        {
            settings.ShapeName = "foo";
            settings.Serialize()["shape"].ShouldEqual("foo");
        }

        [Fact]
        public void Serializes_shape_name_over_shape()
        {
            settings.ShapeName = "foo";
            settings.Shape = MapMarkersShape.Pin;
            settings.Serialize()["shape"].ShouldEqual("foo");
        }

        [Fact]
        public void Does_not_serialize_shape()
        {
            settings.Serialize().ContainsKey("shape").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_tooltip()
        {
            settings.Tooltip.Content = "foo";
            settings.Serialize().ContainsKey("tooltip").ShouldBeTrue();
        }

        [Fact]
        public void Does_not_serialize_tooltip()
        {
            settings.Serialize().ContainsKey("tooltip").ShouldBeFalse();
        }
    }
}