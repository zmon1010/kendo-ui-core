using Kendo.Mvc.Tests;
using Kendo.Mvc.UI.Fluent;
using Xunit;

namespace Kendo.Mvc.UI.Html.Tests
{
    public class MapBuilderTests
    {
        private Map map;
        private MapBuilder builder;

        public MapBuilderTests()
        {
            map = new Map(TestHelper.CreateViewContext());
            builder = new MapBuilder(map);
        }

        [Fact]
        public void Center_sets_center()
        {
            builder.Center(10, 20);
            map.Center.Equals(new double[] { 10, 20 });
        }

        [Fact]
        public void Center_returns_builder()
        {
            builder.Center(10, 20).ShouldBeSameAs(builder);
        }
    }
}