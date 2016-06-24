using Kendo.Mvc.Tests;
using Xunit;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Html.Tests
{
    public class MapMarkerTests
    {
        private MapMarker marker;

        public MapMarkerTests()
        {
            marker = new MapMarker();
            marker.Map = new Map(TestHelper.CreateViewContext());
        }

        [Fact]
        public void Serializes_shape_type()
        {
            marker.Shape = MapMarkersShape.Pin;
            marker.Serialize()["shape"].ShouldEqual("pin");
        }

        [Fact]
        public void Serializes_compound_shape_type()
        {
            marker.Shape = MapMarkersShape.PinTarget;
            marker.Serialize()["shape"].ShouldEqual("pinTarget");
        }

        [Fact]
        public void Serializes_shape_name()
        {
            marker.ShapeName = "foo";
            marker.Serialize()["shape"].ShouldEqual("foo");
        }

        [Fact]
        public void Serializes_shape_name_over_shape()
        {
            marker.ShapeName = "foo";
            marker.Shape = MapMarkersShape.Pin;
            marker.Serialize()["shape"].ShouldEqual("foo");
        }

        [Fact]
        public void Does_not_serialize_shape()
        {
            marker.Serialize().ContainsKey("shape").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_tooltip()
        {
            marker.Tooltip.Content = "foo";
            marker.Serialize().ContainsKey("tooltip").ShouldBeTrue();
        }

        [Fact]
        public void Serializes_tooltip_content()
        {
            marker.Tooltip.Content = "Foo";

            var tooltip = (Dictionary<string, object>)marker.Serialize()["tooltip"];
            tooltip["content"].ShouldEqual("Foo");
        }

        [Fact]
        public void Does_not_serialize_tooltip_by_default()
        {
            marker.Serialize().ContainsKey("tooltip").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_attributes()
        {
            marker.HtmlAttributes.Add("foo", "bar");
            marker.Serialize().ContainsKey("attributes").ShouldBeTrue();
        }

        [Fact]
        public void Does_not_serialize_attributes()
        {
            marker.Serialize().ContainsKey("attributes").ShouldBeFalse();
        }
    }
}