using Kendo.Mvc.Tests;
using Kendo.Mvc.UI.Fluent;
using Xunit;

namespace Kendo.Mvc.UI.Html.Tests
{
    public class MapControlsSettingsTests
    {
        private readonly MapControlsSettings settings;

        public MapControlsSettingsTests()
        {
            settings = new MapControlsSettings();
        }

        [Fact]
        public void Serializes_attribution_settings()
        {
            settings.Attribution.Position = MapControlPosition.TopLeft;
            settings.Serialize().ContainsKey("attribution").ShouldBeTrue();
        }

        [Fact]
        public void Serializes_false_if_attribution_settings_are_disabled()
        {
            settings.Attribution.Enabled = false;
            settings.Serialize()["attribution"].ShouldEqual(false);
        }
    }
}