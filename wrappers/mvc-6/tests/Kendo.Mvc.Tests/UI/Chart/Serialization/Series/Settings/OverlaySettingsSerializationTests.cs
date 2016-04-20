using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class OverlaySettingsSerializationTests
    {
        private readonly ChartSeriesOverlaySettings<object> settings;

        public OverlaySettingsSerializationTests()
        {
            settings = new ChartSeriesOverlaySettings<object>();
        }

        [Fact]
        public void Default_Gradient_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("gradient").ShouldBeFalse();
        }

        [Fact]
        public void Gradient_should_be_serialized()
        {
            settings.Gradient = ChartSeriesGradient.Glass;

            settings.Serialize()["gradient"].ShouldEqual("glass");
        }
    }
}