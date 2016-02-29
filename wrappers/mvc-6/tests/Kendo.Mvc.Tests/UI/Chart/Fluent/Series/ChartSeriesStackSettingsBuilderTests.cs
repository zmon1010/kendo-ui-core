using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;
using Moq;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartSeriesStackSettingsBuilderTests
    {
        private readonly ChartSeriesStackSettings<SalesData> stackSettings;
        private readonly ChartSeriesStackSettingsBuilder<SalesData> builder;

        public ChartSeriesStackSettingsBuilderTests()
        {
            stackSettings = new ChartSeriesStackSettings<SalesData>();
            builder = new ChartSeriesStackSettingsBuilder<SalesData>(stackSettings);
        }

        [Fact]
        public void Type_Should_set_settings_Type()
        {
            var value = ChartStackType.Stack100;

            builder.Type(value);

            stackSettings.Type.ShouldEqual(value);
        }

        [Fact]
        public void Type_should_return_builder()
        {
            builder.Type(ChartStackType.Stack100).ShouldBeSameAs(builder);
        }        
    }
}