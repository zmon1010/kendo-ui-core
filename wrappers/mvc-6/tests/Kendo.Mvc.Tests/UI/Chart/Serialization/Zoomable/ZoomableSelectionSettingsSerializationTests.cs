using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class ZoomableSelectionSettingsSerializationTests
    {
        private readonly ChartZoomableSelectionSettings<object> settings;

        public ZoomableSelectionSettingsSerializationTests()
        {
            settings = new ChartZoomableSelectionSettings<object>();
        }

        [Fact]
        public void Default_Key_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("key").ShouldBeFalse();
        }

        [Fact]
        public void Key_should_be_serialized()
        {
            settings.Key = ChartActivationKey.Ctrl;

            settings.Serialize()["key"].ShouldEqual("ctrl");
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