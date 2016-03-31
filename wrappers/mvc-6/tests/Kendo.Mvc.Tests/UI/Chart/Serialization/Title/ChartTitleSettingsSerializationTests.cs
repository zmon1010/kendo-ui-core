using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartTitleSettingsSerializationTests
    {
        private readonly ChartTitleSettings<object> settings;

        public ChartTitleSettingsSerializationTests()
        {
            settings = new ChartTitleSettings<object>();
        }

        [Fact]
        public void Default_Align_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("align").ShouldBeFalse();
        }

        [Fact]
        public void Align_should_be_serialized()
        {
            settings.Align = ChartTextAlignment.Center;

            settings.Serialize()["align"].ShouldEqual("center");
        }

        [Fact]
        public void Default_Position_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("position").ShouldBeFalse();
        }

        [Fact]
        public void Position_should_be_serialized()
        {
            settings.Position = ChartTitlePosition.Top;

            settings.Serialize()["position"].ShouldEqual("top");
        }
    }
}