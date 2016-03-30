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
        public void Builder_should_set_series_Aggregate()
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
        public void Builder_should_set_series_aggregates()
        {
            builder.Aggregate(x => x.Close(ChartSeriesAggregate.Avg));

            series.Aggregates.Close.ShouldEqual(ChartSeriesAggregate.Avg);
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
        public void Builder_should_set_DashType()
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

        [Fact]
        public void Builder_should_set_MissingValues()
        {
            var value = ChartSeriesMissingValues.Interpolate;

            builder.MissingValues(value);

            series.MissingValues.ShouldEqual(value);
        }

        [Fact]
        public void MissingValues_should_return_builder()
        {
            builder.MissingValues(ChartSeriesMissingValues.Interpolate).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_MissingValues_with_ChartAreaMissingValues()
        {
            builder.MissingValues(ChartAreaMissingValues.Zero);

            series.MissingValues.ShouldEqual(ChartSeriesMissingValues.Zero);
        }

        [Fact]
        public void MissingValues_with_ChartAreaMissingValues_should_return_builder()
        {
            builder.MissingValues(ChartAreaMissingValues.Zero).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_MissingValues_with_ChartLineMissingValues()
        {
            builder.MissingValues(ChartLineMissingValues.Interpolate);

            series.MissingValues.ShouldEqual(ChartSeriesMissingValues.Interpolate);
        }

        [Fact]
        public void MissingValues_with_ChartLineMissingValues_should_return_builder()
        {
            builder.MissingValues(ChartLineMissingValues.Interpolate).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_MissingValues_with_ChartScatterLineMissingValues()
        {
            builder.MissingValues(ChartScatterLineMissingValues.Gap);

            series.MissingValues.ShouldEqual(ChartSeriesMissingValues.Gap);
        }

        [Fact]
        public void MissingValues_with_ChartScatterLineMissingValues_should_return_builder()
        {
            builder.MissingValues(ChartScatterLineMissingValues.Gap).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Stack_Group()
        {
            var value = "group";

            builder.Stack(value);

            series.Stack.Group.ShouldEqual(value);
        }

        [Fact]
        public void Stack_Group_should_return_builder()
        {
            builder.Stack("group").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Stack_Group_and_Type()
        {
            var stackType = ChartStackType.Stack100;
            var stackGroup = "group";

            builder.Stack(stackType, stackGroup);

            series.Stack.Type.ShouldEqual(stackType);
            series.Stack.Group.ShouldEqual(stackGroup);
        }

        [Fact]
        public void Stack_Group_and_Type_should_return_builder()
        {
            builder.Stack("group").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Stack_Type()
        {
            var value = ChartStackType.Stack100;

            builder.Stack(value);

            series.Stack.Type.ShouldEqual(value);
        }

        [Fact]
        public void Stack_Type_should_return_builder()
        {
            builder.Stack(ChartStackType.Stack100).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Style()
        {
            var value = ChartLineStyle.Smooth;

            builder.Style(value);

            series.Style.ShouldEqual(value);
        }

        [Fact]
        public void Style_should_return_builder()
        {
            builder.Style(ChartLineStyle.Smooth).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Line_Style()
        {
            var value = ChartAreaStyle.Smooth;

            builder.Line(x => x.Style(value));

            series.Line.Style.ShouldEqual(value);
        }

        [Fact]
        public void Line_Style_should_return_builder()
        {
            builder.Line(x => x.Style(ChartAreaStyle.Smooth)).ShouldBeSameAs(builder);
        }
    }
}