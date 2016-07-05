using Kendo.Mvc.Tests;
using Kendo.Mvc.UI.Fluent;
using Xunit;

namespace Kendo.Mvc.UI.Html.Tests
{
    public class AttributionSettingsTests
    {
        private readonly MapControlsAttributionSettings settings;

        public AttributionSettingsTests()
        {
            settings = new MapControlsAttributionSettings();
        }

        [Fact]
        public void Serializes_position()
        {
            settings.Position = MapControlPosition.TopLeft;
            settings.Serialize()["position"].ShouldEqual("topLeft");
        }

        [Fact]
        public void Does_not_serialize_default_position()
        {
            settings.Serialize().ContainsKey("position").ShouldBeFalse();
        }
    }
}