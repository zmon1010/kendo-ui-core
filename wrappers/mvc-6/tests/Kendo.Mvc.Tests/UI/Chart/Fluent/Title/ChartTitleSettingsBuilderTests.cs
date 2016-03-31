using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartTitleSettingsBuilderTests
    {
        private readonly ChartTitleSettings<object> settings;
        private readonly ChartTitleSettingsBuilder<object> builder;

        public ChartTitleSettingsBuilderTests()
        {
            settings = new ChartTitleSettings<object>();
            builder = new ChartTitleSettingsBuilder<object>(settings);
        }

        [Fact]
        public void Builder_should_set_Align()
        {
            var value = ChartTextAlignment.Center;

            builder.Align(value);

            settings.Align.ShouldEqual(value);
        }

        [Fact]
        public void Align_should_return_builder()
        {
            builder.Align(ChartTextAlignment.Center).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Position()
        {
            var value = ChartTitlePosition.Bottom;

            builder.Position(value);

            settings.Position.ShouldEqual(value);
        }

        [Fact]
        public void Position_should_return_builder()
        {
            builder.Position(ChartTitlePosition.Bottom).ShouldBeSameAs(builder);
        }
    }
}