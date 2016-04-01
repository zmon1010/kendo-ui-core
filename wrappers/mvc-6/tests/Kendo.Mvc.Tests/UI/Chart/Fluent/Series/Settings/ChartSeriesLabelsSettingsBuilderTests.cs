using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;
using Moq;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartSeriesLabelsSettingsBuilderTests
    {
        private readonly ChartSeriesLabelsSettings<SalesData> stackSettings;
        private readonly ChartSeriesLabelsSettingsBuilder<SalesData> builder;

        public ChartSeriesLabelsSettingsBuilderTests()
        {
            stackSettings = new ChartSeriesLabelsSettings<SalesData>();
            builder = new ChartSeriesLabelsSettingsBuilder<SalesData>(stackSettings);
        }

        [Fact]
        public void Builder_should_set_Position()
        {
            var value = ChartSeriesLabelsPosition.Bottom;

            builder.Position(value);

            stackSettings.Position.ShouldEqual(value);
        }

        [Fact]
        public void Position_should_return_builder()
        {
            builder.Position(ChartSeriesLabelsPosition.Bottom).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Position_with_ChartPieLabelsPosition()
        {
            var value = ChartPieLabelsPosition.InsideEnd;

            builder.Position(value);

            stackSettings.Position.ShouldEqual(ChartSeriesLabelsPosition.InsideEnd);
        }

        [Fact]
        public void Position_with_ChartPieLabelsPositio_should_return_builder()
        {
            builder.Position(ChartPieLabelsPosition.InsideEnd).ShouldBeSameAs(builder);
        }
    }
}