using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;
using Moq;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartSeriesBuilderTests
    {
        private readonly ChartSeries<SalesData> series;
        private readonly ChartSeriesBuilder<SalesData> builder;
        private readonly Func<object, object> nullFunction;

        public ChartSeriesBuilderTests()
        {
            series = new ChartSeries<SalesData>();
            builder = new ChartSeriesBuilder<SalesData>(series);
            nullFunction = (target) => null;
        }

        [Fact]
        public void Aggregate_should_set_series_Aggregate()
        {
            var value = ChartSeriesAggregate.Avg;

            builder.Aggregate(value);

            series.Aggregate.ShouldEqual(value);
        }

        [Fact]
        public void Aggregate_should_reset_AggregateHandler()
        {
            series.AggregateHandler = new ClientHandlerDescriptor() { HandlerName = "handler" };

            builder.Aggregate(ChartSeriesAggregate.Avg);

            series.AggregateHandler.ShouldEqual(null);
        }

        [Fact]
        public void Aggregate_should_return_builder()
        {
            builder.Aggregate(ChartSeriesAggregate.Avg).ShouldBeSameAs(builder);
        }

        [Fact]
        public void AggregateHandler_should_reset_Aggregate()
        {
            series.Aggregate = ChartSeriesAggregate.Avg;

            builder.AggregateHandler("handler");

            series.Aggregate.ShouldEqual(null);
        }

        [Fact]
        public void AggregateHandler_should_return_builder()
        {
            builder.AggregateHandler("handler").ShouldBeSameAs(builder);
        }

        [Fact]
        public void AggregaterHandler_with_function_should_return_builder()
        {
            builder.AggregateHandler(nullFunction).ShouldBeSameAs(builder);
        }


        [Fact]
        public void Color_should_reset_ColorHandler()
        {
            series.ColorHandler = new ClientHandlerDescriptor() { HandlerName = "handler" };

            builder.Color("red");

            series.ColorHandler.ShouldEqual(null);
        }

        [Fact]
        public void Color_should_return_builder()
        {
            builder.Color("red").ShouldBeSameAs(builder);
        }

        [Fact]
        public void ColorHandler_should_reset_Color()
        {
            series.Color = "red";

            builder.ColorHandler("handler");

            series.Color.ShouldEqual(null);
        }

        [Fact]
        public void ColorHandler_should_return_builder()
        {
            builder.ColorHandler("handler").ShouldBeSameAs(builder);
        }

        [Fact]
        public void ColorHandler_with_function_should_return_builder()
        {
            builder.ColorHandler(nullFunction).ShouldBeSameAs(builder);
        }

        [Fact]
        public void DashType_should_set_series_DashType()
        {
            var value = ChartDashType.Solid;

            builder.DashType(value);

            series.DashType.ShouldEqual(value);
        }
        
        [Fact]
        public void DashType_should_return_builder()
        {
            builder.DashType(ChartDashType.Dot).ShouldBeSameAs(builder);
        }
    }
}