using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using System.Collections.Generic;

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
        public void Aggregates_should_be_serialized()
        {
            var value = ChartSeriesAggregate.Avg;

            series.Aggregates.Close = value;

            ((Dictionary<string, object>)series.Serialize()["aggregate"])["close"].ShouldEqual("avg");
        }

        [Fact]
        public void Default_CloseField_should_not_be_serialized()
        {
            series.Serialize().ContainsKey("closeField").ShouldBeFalse();
        }

        [Fact]
        public void CloseField_should_be_serialized()
        {
            var value = "value";

            series.CloseField = value;

            series.Serialize()["closeField"].ShouldEqual(value);
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

        [Fact]
        public void Default_HighField_should_not_be_serialized()
        {
            series.Serialize().ContainsKey("highField").ShouldBeFalse();
        }

        [Fact]
        public void HighField_should_be_serialized()
        {
            var value = "value";

            series.HighField = value;

            series.Serialize()["highField"].ShouldEqual(value);
        }

        [Fact]
        public void Default_LowField_should_not_be_serialized()
        {
            series.Serialize().ContainsKey("lowField").ShouldBeFalse();
        }

        [Fact]
        public void LowField_should_be_serialized()
        {
            var value = "value";

            series.LowField = value;

            series.Serialize()["lowField"].ShouldEqual(value);
        }

        [Fact]
        public void Default_MissingValues_should_not_be_serialized()
        {
            series.Serialize().ContainsKey("missingValues").ShouldBeFalse();
        }

        [Fact]
        public void MissingValues_should_be_serialized()
        {
            series.MissingValues = ChartSeriesMissingValues.Gap;

            series.Serialize()["missingValues"].ShouldEqual("gap");
        }

        [Fact]
        public void Default_OpenField_should_not_be_serialized()
        {
            series.Serialize().ContainsKey("openField").ShouldBeFalse();
        }

        [Fact]
        public void OpenField_should_be_serialized()
        {
            var value = "value";

            series.OpenField = value;

            series.Serialize()["openField"].ShouldEqual(value);
        }

        [Fact]
        public void Default_Style_should_not_be_serialized()
        {
            series.Serialize().ContainsKey("style").ShouldBeFalse();
        }

        [Fact]
        public void Style_should_be_serialized()
        {
            series.Style = ChartLineStyle.Smooth;

            series.Serialize()["style"].ShouldEqual("smooth");
        }
    }
}