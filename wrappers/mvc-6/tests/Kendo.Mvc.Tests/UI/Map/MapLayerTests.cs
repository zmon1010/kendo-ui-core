
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
        public void Serializes_with_no_map()
        {
            layer.Map = null;
            layer.Serialize().ShouldNotBeNull();
        }

        [Fact]
        public void Serializes_datasource()
        {
            layer.DataSource = new DataSource(layer.Map.ModelMetadataProvider);

            layer.Serialize().ContainsKey("dataSource").ShouldBeTrue();
        }

        [Fact]
        public void Serializes_shape_type()
        {
            layer.Shape = MapMarkersShape.Pin;
            layer.Serialize()["shape"].ShouldEqual("pin");
        }

        [Fact]
        public void Serializes_compound_shape_type()
        {
            layer.Shape = MapMarkersShape.PinTarget;
            layer.Serialize()["shape"].ShouldEqual("pinTarget");
        }

        [Fact]
        public void Serializes_shape_name()
        {
            layer.ShapeName = "foo";
            layer.Serialize()["shape"].ShouldEqual("foo");
        }

        [Fact]
        public void Serializes_shape_name_over_shape()
        {
            layer.ShapeName = "foo";
            layer.Shape = MapMarkersShape.Pin;
            layer.Serialize()["shape"].ShouldEqual("foo");
        }

        [Fact]
        public void Does_not_serialize_shape()
        {
            layer.Serialize().ContainsKey("shape").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_tooltip()
        {
            layer.Tooltip.Content = "foo";
            layer.Serialize().ContainsKey("tooltip").ShouldBeTrue();
        }

        [Fact]
        public void Does_not_serialize_tooltip()
        {
            layer.Serialize().ContainsKey("tooltip").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_symbol_type()
        {
            layer.Symbol = MapSymbol.Circle;
            layer.Serialize()["symbol"].ShouldEqual("circle");
        }

        [Fact]
        public void Serializes_symbol_name()
        {
            layer.SymbolName = "foo";
            layer.Serialize()["symbol"].ShouldEqual("foo");
        }

        [Fact]
        public void Serializes_symbol_handler()
        {
            layer.SymbolHandler = new ClientHandlerDescriptor { HandlerName = "foo" };
            layer.Serialize()["symbol"].ShouldEqual(layer.SymbolHandler);
        }

        [Fact]
        public void Serializes_symbol_name_over_symbol()
        {
            layer.SymbolName = "foo";
            layer.Symbol = MapSymbol.Circle;
            layer.Serialize()["symbol"].ShouldEqual("foo");
        }

        [Fact]
        public void Serializes_symbol_handler_over_symbol_and_name()
        {
            layer.SymbolHandler = new ClientHandlerDescriptor { HandlerName = "foo" };
            layer.SymbolName = "bar";
            layer.Symbol = MapSymbol.Circle;
            layer.Serialize()["symbol"].ShouldEqual(layer.SymbolHandler);
        }

        [Fact]
        public void Does_not_serialize_symbol()
        {
            layer.Serialize().ContainsKey("symbol").ShouldBeFalse();
        }
    }
}