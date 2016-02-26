using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartSeriesSerializationTests
    {
        private readonly ChartSeries<object> series;

        public ChartSeriesSerializationTests()
        {
            series = new ChartSeries<object>();
        }

        [Fact]
        public void Serializes_Data()
        {
            var data = new int[] { 1, 2, 3 };
            series.Data = data;
            series.Serialize()["data"].ShouldBeSameAs(data);
        }

        [Fact]
        public void Does_not_serialize_empty_data()
        {
            series.Serialize().ContainsKey("data").ShouldBeFalse();
        }

        [Fact]
        public void Default_Aggregate_should_not_be_serialized()
        {
            series.Serialize().ContainsKey("aggregate").ShouldBeFalse();
        }

        [Fact]
        public void Aggregate_should_be_serialized()
        {
            series.Aggregate = ChartSeriesAggregate.Avg;

            series.Serialize()["aggregate"].ShouldEqual("avg");
        }

        [Fact]
        public void AggregateHandler_should_be_serialized()
        {
            var value = new ClientHandlerDescriptor() { HandlerName = "handler" };

            series.AggregateHandler = value;

            series.Serialize()["aggregate"].ShouldEqual(value);
        }

        [Fact]
        public void Default_Color_should_not_be_serialized()
        {
            series.Serialize().ContainsKey("color").ShouldBeFalse();
        }

        [Fact]
        public void Color_should_be_serialized()
        {
            var value = "red";

            series.Color = value;

            series.Serialize()["color"].ShouldEqual(value);
        }

        [Fact]
        public void Default_DashType_should_not_be_serialized()
        {
            series.Serialize().ContainsKey("dashType").ShouldBeFalse();
        }

        [Fact]
        public void DashType_should_be_serialized()
        {
            series.DashType = ChartDashType.Dot;

            series.Serialize()["dashType"].ShouldEqual("dot");
        }
    }
}