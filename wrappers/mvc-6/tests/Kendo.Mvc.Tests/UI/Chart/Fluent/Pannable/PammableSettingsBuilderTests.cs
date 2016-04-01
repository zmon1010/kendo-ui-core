using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class PammableSettingsBuilderTests
    {
        private readonly ChartPannableSettings<object> settings;
        private readonly ChartPannableSettingsBuilder<object> builder;

        public PammableSettingsBuilderTests()
        {
            settings = new ChartPannableSettings<object>();
            builder = new ChartPannableSettingsBuilder<object>(settings);
        }

        [Fact]
        public void Builder_should_set_Key()
        {
            var value = ChartActivationKey.Ctrl;

            builder.Key(value);

            settings.Key.ShouldEqual(value);
        }

        [Fact]
        public void Key_should_return_builder()
        {
            builder.Key(ChartActivationKey.Ctrl).ShouldBeSameAs(builder);
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