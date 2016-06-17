using Kendo.Mvc.Tests;
using Kendo.Mvc.UI.Fluent;
using Xunit;

namespace Kendo.Mvc.UI.Html.Tests
{
    public class MapMarkerBuilderTests
    {
        private MapMarker marker;
        private MapMarkerBuilder builder;

        public MapMarkerBuilderTests()
        {
            marker = new MapMarker();
            marker.Map = new Map(TestHelper.CreateViewContext());
            builder = new MapMarkerBuilder(marker);
        }

        [Fact]
        public void Tooltip_configures_tooltip()
        {
            builder.Tooltip(t => t.Content("Foo"));
            marker.Tooltip.Content.Equals("Foo");
        }

        [Fact]
        public void Tooltip_returns_builder()
        {
            builder.Tooltip(t => t.Content("Foo")).ShouldBeSameAs(builder);
        }
   }
}