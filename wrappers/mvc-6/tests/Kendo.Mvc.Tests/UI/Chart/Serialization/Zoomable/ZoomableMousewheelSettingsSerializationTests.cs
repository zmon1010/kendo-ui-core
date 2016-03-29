using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class ZoomableMousewheelSettingsSerializationTests
    {
        private readonly ChartZoomableMousewheelSettings<object> settings;

        public ZoomableMousewheelSettingsSerializationTests()
        {
            settings = new ChartZoomableMousewheelSettings<object>();
        }

        [Fact]
        public void Default_Lock_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("lock").ShouldBeFalse();
        }

        [Fact]
        public void Lock_should_be_serialized()
        {
            settings.Lock = ChartAxisLock.X;

            settings.Serialize()["lock"].ShouldEqual("x");
        }
    }
}