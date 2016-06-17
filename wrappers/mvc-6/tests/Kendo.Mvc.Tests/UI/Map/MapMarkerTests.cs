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
        public void Does_not_serialize_tooltip_by_default()
        {
            marker.Serialize().ContainsKey("tooltip").ShouldBeFalse();
        }
        
        [Fact]
        public void Serializes_tooltip_content()
        {
            marker.Tooltip.Content = "Foo";

            var tooltip = (Dictionary<string, object>) marker.Serialize()["tooltip"];
            tooltip["content"].ShouldEqual("Foo");
        }
    }
}