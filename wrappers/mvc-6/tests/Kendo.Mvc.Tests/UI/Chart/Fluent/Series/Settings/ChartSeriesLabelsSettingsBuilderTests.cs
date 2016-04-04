using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;
using Moq;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartSeriesLabelsSettingsBuilderTests
    {
        private readonly ChartSeriesLabelsSettings<SalesData> settings;
        private readonly ChartSeriesLabelsSettingsBuilder<SalesData> builder;

        public ChartSeriesLabelsSettingsBuilderTests()
        {
            settings = new ChartSeriesLabelsSettings<SalesData>();
            builder = new ChartSeriesLabelsSettingsBuilder<SalesData>(settings);
        }

        [Fact]
        public void Builder_should_set_Margin()
        {
            var value = 10;
            builder.Margin(value); ;

            settings.Margin.Top.ShouldEqual(value);
            settings.Margin.Right.ShouldEqual(value);
            settings.Margin.Bottom.ShouldEqual(value);
            settings.Margin.Left.ShouldEqual(value);
        }

        [Fact]
        public void Margin_should_return_builder()
        {
            builder.Margin(10).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Padding()
        {
            var value = 10;
            builder.Padding(value); ;

            settings.Padding.Top.ShouldEqual(value);
            settings.Padding.Right.ShouldEqual(value);
            settings.Padding.Bottom.ShouldEqual(value);
            settings.Padding.Left.ShouldEqual(value);
        }

        [Fact]
        public void Padding_should_return_builder()
        {
            builder.Padding(10).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Position()
        {
            var value = ChartSeriesLabelsPosition.Bottom;

            builder.Position(value);

            settings.Position.ShouldEqual(value);
        }

        [Fact]
        public void Position_should_return_builder()
        {
            builder.Position(ChartSeriesLabelsPosition.Bottom).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Position_with_ChartBarLabelsPosition()
        {
            var value = ChartBarLabelsPosition.InsideBase;

            builder.Position(value);

            settings.Position.ShouldEqual(ChartSeriesLabelsPosition.InsideBase);
        }

        [Fact]
        public void Position_with_ChartBarLabelsPositionp_should_return_builder()
        {
            builder.Position(ChartBarLabelsPosition.InsideBase).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Align_with_ChartFunnelLabelsAlign()
        {
            var value = ChartFunnelLabelsAlign.Right;

            builder.Align(value);

            settings.Align.ShouldEqual(ChartSeriesLabelsAlign.Right);
        }

        [Fact]
        public void Align_with_ChartFunnelLabelsPosition_should_return_builder()
        {
            builder.Align(ChartFunnelLabelsAlign.Right).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Position_with_ChartFunnelLabelsPosition()
        {
            var value = ChartFunnelLabelsPosition.Center;

            builder.Position(value);

            settings.Position.ShouldEqual(ChartSeriesLabelsPosition.Center);
        }

        [Fact]
        public void Position_with_ChartFunnelLabelsPosition_should_return_builder()
        {
            builder.Position(ChartFunnelLabelsPosition.Center).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Align_with_ChartPieLabelsAlign()
        {
            var value = ChartPieLabelsAlign.Column;

            builder.Align(value);

            settings.Align.ShouldEqual(ChartSeriesLabelsAlign.Column);
        }

        [Fact]
        public void Align_with_ChartPieLabelsPosition_should_return_builder()
        {
            builder.Align(ChartPieLabelsAlign.Column).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Position_with_ChartPieLabelsPosition()
        {
            var value = ChartPieLabelsPosition.InsideEnd;

            builder.Position(value);

            settings.Position.ShouldEqual(ChartSeriesLabelsPosition.InsideEnd);
        }

        [Fact]
        public void Position_with_ChartPieLabelsPosition_should_return_builder()
        {
            builder.Position(ChartPieLabelsPosition.InsideEnd).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Position_with_ChartPointLabelsPosition()
        {
            var value = ChartPointLabelsPosition.Below;

            builder.Position(value);

            settings.Position.ShouldEqual(ChartSeriesLabelsPosition.Below);
        }

        [Fact]
        public void Position_with_ChartPointLabelsPosition_should_return_builder()
        {
            builder.Position(ChartPointLabelsPosition.Below).ShouldBeSameAs(builder);
        }
    }
}