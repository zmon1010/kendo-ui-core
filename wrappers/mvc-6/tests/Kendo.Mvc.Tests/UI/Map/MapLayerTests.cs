
using Kendo.Mvc.Tests;
using Xunit;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Html.Tests
{
    public class MapLayerTests
    {
        private MapLayer layer;

        public MapLayerTests()
        {
            layer = new MapLayer();
            layer.Map = new Map(TestHelper.CreateViewContext());
        }

        [Fact]
        public void Does_not_serialize_datasource_by_default()
        {
            layer.Serialize().ContainsKey("dataSource").ShouldBeFalse();
        }
        
        [Fact]
        public void Serializes_datasource()
        {
            layer.DataSource = new DataSource(layer.Map.ModelMetadataProvider);

            layer.Serialize().ContainsKey("dataSource").ShouldBeTrue();
        }
    }
}