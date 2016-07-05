using Kendo.Mvc.Tests;
using Kendo.Mvc.UI.Fluent;
using Xunit;

namespace Kendo.Mvc.UI.Html.Tests
{
    public class MapLayerDefaultsBubbleSettingsBuilderTests
    {
        private readonly MapLayerDefaultsBubbleSettings settings;
        private readonly MapLayerDefaultsBubbleSettingsBuilder builder;

        public MapLayerDefaultsBubbleSettingsBuilderTests()
        {
            settings = new MapLayerDefaultsBubbleSettings();
            settings.Map = new Map(TestHelper.CreateViewContext());
            builder = new MapLayerDefaultsBubbleSettingsBuilder(settings);
        }

        [Fact]
        public void Sets_settings_symbol()
        {
            builder.Symbol(MapSymbol.Circle);
            settings.Symbol.ShouldEqual(MapSymbol.Circle);
        }

        [Fact]
        public void Setting_settings_symbol_returns_builder()
        {
            builder.Symbol(MapSymbol.Circle).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Sets_settings_symbol_name()
        {
            builder.Symbol("Foo");
            settings.SymbolName.ShouldEqual("Foo");
        }

        [Fact]
        public void Setting_settings_symbol_name_returns_builder()
        {
            builder.Symbol("Foo").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Sets_settings_symbol_handler()
        {
            builder.SymbolHandler("foo");
            settings.SymbolHandler.HandlerName.ShouldEqual("foo");
        }

        [Fact]
        public void Setting_settings_symbol_handler_returns_builder()
        {
            builder.SymbolHandler("foo").ShouldBeSameAs(builder);
        }
    }
}