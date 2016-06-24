using Kendo.Mvc.Tests;
using Kendo.Mvc.UI.Fluent;
using Xunit;

namespace Kendo.Mvc.UI.Html.Tests
{
    public class MapLayerDefaultsBubbleSettingsTests
    {
        private readonly MapLayerDefaultsBubbleSettings defaults;

        public MapLayerDefaultsBubbleSettingsTests()
        {
            defaults = new MapLayerDefaultsBubbleSettings();
            defaults.Map = new Map(TestHelper.CreateViewContext());
        }

        [Fact]
        public void Serializes_symbol_type()
        {
            defaults.Symbol = MapSymbol.Circle;
            defaults.Serialize()["symbol"].ShouldEqual("circle");
        }

        [Fact]
        public void Serializes_symbol_name()
        {
            defaults.SymbolName = "foo";
            defaults.Serialize()["symbol"].ShouldEqual("foo");
        }

        [Fact]
        public void Serializes_symbol_handler()
        {
            defaults.SymbolHandler = new ClientHandlerDescriptor { HandlerName = "foo" };
            defaults.Serialize()["symbol"].ShouldEqual(defaults.SymbolHandler);
        }

        [Fact]
        public void Serializes_symbol_name_over_symbol()
        {
            defaults.SymbolName = "foo";
            defaults.Symbol = MapSymbol.Circle;
            defaults.Serialize()["symbol"].ShouldEqual("foo");
        }

        [Fact]
        public void Serializes_symbol_handler_over_symbol_and_name()
        {
            defaults.SymbolHandler = new ClientHandlerDescriptor { HandlerName = "foo" };
            defaults.SymbolName = "bar";
            defaults.Symbol = MapSymbol.Circle;
            defaults.Serialize()["symbol"].ShouldEqual(defaults.SymbolHandler);
        }

        [Fact]
        public void Does_not_serialize_symbol()
        {
            defaults.Serialize().ContainsKey("symbol").ShouldBeFalse();
        }
    }
}