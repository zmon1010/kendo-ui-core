using Kendo.Mvc.Tests;
using Kendo.Mvc.UI.Fluent;
using Xunit;

namespace Kendo.Mvc.UI.Html.Tests
{
    public class MapLayerBuilderTests
    {
        private MapLayer Layer;
        private MapLayerBuilder builder;

        public MapLayerBuilderTests()
        {
            Layer = new MapLayer();
            Layer.Map = new Map(TestHelper.CreateViewContext());
            builder = new MapLayerBuilder(Layer);
        }

        [Fact]
        public void DataSource_configures_DataSource()
        {
            builder.DataSource(t => t.Read(r => r.Url("Foo")));
            Layer.DataSource.Transport.Read.Url.Equals("Foo");
        }

        [Fact]
        public void DataSource_returns_builder()
        {
            builder.DataSource(t => t.Read(r => r.Url("Foo"))).ShouldBeSameAs(builder);
        }
   }
}