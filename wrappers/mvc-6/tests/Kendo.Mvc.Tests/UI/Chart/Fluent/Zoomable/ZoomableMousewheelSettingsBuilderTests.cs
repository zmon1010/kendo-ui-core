using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class ZoomableMousewheelSettingsBuilderTests
    {
        private readonly ChartZoomableMousewheelSettings<object> settings;
        private readonly ChartZoomableMousewheelSettingsBuilder<object> builder;

        public ZoomableMousewheelSettingsBuilderTests()
        {
            settings = new ChartZoomableMousewheelSettings<object>();
            builder = new ChartZoomableMousewheelSettingsBuilder<object>(settings);
        }

        [Fact]
        public void Builder_should_set_Lock()
        {
            var value = ChartAxisLock.X; ;

            builder.Lock(value);

            settings.Lock.ShouldEqual(value);
        }

        [Fact]
        public void Lock_should_return_builder()
        {
            builder.Lock(ChartAxisLock.X).ShouldBeSameAs(builder);
        }        
    }
}