using Kendo.Mvc.Tests;
using Kendo.Mvc.UI.Fluent;
using Xunit;

namespace Kendo.Mvc.UI.Html.Tests
{
    public class MapLayerDefaultsMarkerSettingsBuilderTests
    {
        private readonly MapLayerDefaultsMarkerSettings settings;
        private readonly MapLayerDefaultsMarkerSettingsBuilder builder;

        public MapLayerDefaultsMarkerSettingsBuilderTests()
        {
            settings = new MapLayerDefaultsMarkerSettings();
            settings.Map = new Map(TestHelper.CreateViewContext());
            builder = new MapLayerDefaultsMarkerSettingsBuilder(settings);
        }

        [Fact]
        public void Sets_settings_shape()
        {
            builder.Shape(MapMarkersShape.PinTarget);
            settings.Shape.ShouldEqual(MapMarkersShape.PinTarget);
        }

        [Fact]
        public void Setting_settings_shape_returns_builder()
        {
            builder.Shape(MapMarkersShape.PinTarget).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Sets_settings_shape_name()
        {
            builder.Shape("Foo");
            settings.ShapeName.ShouldEqual("Foo");
        }

        [Fact]
        public void Setting_settings_shape_name_returns_builder()
        {
            builder.Shape("Foo").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Sets_settings_tooltip()
        {
            builder.Tooltip(tooltip => tooltip.Content("foo"));
            settings.Tooltip.Content.ShouldEqual("foo");
        }

        [Fact]
        public void Setting_settings_tooltip_returns_builder()
        {
            builder.Tooltip(tooltip => tooltip.Content("foo")).ShouldBeSameAs(builder);
        }
    }
}