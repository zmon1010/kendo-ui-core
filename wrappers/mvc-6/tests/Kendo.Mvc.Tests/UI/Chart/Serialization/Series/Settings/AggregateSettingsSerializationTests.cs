using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class AggregateSettingsSerializationTests
    {
        private readonly ChartSeriesAggregateSettings<object> settings;

        public AggregateSettingsSerializationTests()
        {
            settings = new ChartSeriesAggregateSettings<object>();
        }

        [Fact]
        public void Default_Close_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("close").ShouldBeFalse();
        }

        [Fact]
        public void Close_should_be_serialized()
        {
            settings.Close = ChartSeriesAggregate.Avg;

            settings.Serialize()["close"].ShouldEqual("avg");
        }

        [Fact]
        public void CloseHandler_should_be_serialized()
        {
            var value = new ClientHandlerDescriptor() { HandlerName = "handler" };

            settings.CloseHandler = value;

            settings.Serialize()["close"].ShouldEqual(value);
        }

        [Fact]
        public void Default_High_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("high").ShouldBeFalse();
        }

        [Fact]
        public void High_should_be_serialized()
        {
            settings.High = ChartSeriesAggregate.Avg;

            settings.Serialize()["high"].ShouldEqual("avg");
        }

        [Fact]
        public void HighHandler_should_be_serialized()
        {
            var value = new ClientHandlerDescriptor() { HandlerName = "handler" };

            settings.HighHandler = value;

            settings.Serialize()["high"].ShouldEqual(value);
        }

        [Fact]
        public void Default_Low_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("low").ShouldBeFalse();
        }

        [Fact]
        public void Low_should_be_serialized()
        {
            settings.Low = ChartSeriesAggregate.Avg;

            settings.Serialize()["low"].ShouldEqual("avg");
        }

        [Fact]
        public void LowHandler_should_be_serialized()
        {
            var value = new ClientHandlerDescriptor() { HandlerName = "handler" };

            settings.LowHandler = value;

            settings.Serialize()["low"].ShouldEqual(value);
        }

        [Fact]
        public void Default_Open_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("open").ShouldBeFalse();
        }

        [Fact]
        public void Open_should_be_serialized()
        {
            settings.Open = ChartSeriesAggregate.Avg;

            settings.Serialize()["open"].ShouldEqual("avg");
        }

        [Fact]
        public void OpenHandler_should_be_serialized()
        {
            var value = new ClientHandlerDescriptor() { HandlerName = "handler" };

            settings.OpenHandler = value;

            settings.Serialize()["open"].ShouldEqual(value);
        }

        [Fact]
        public void Default_Lower_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("lower").ShouldBeFalse();
        }

        [Fact]
        public void Lower_should_be_serialized()
        {
            settings.Lower = ChartSeriesAggregate.Avg;

            settings.Serialize()["lower"].ShouldEqual("avg");
        }

        [Fact]
        public void LowerHandler_should_be_serialized()
        {
            var value = new ClientHandlerDescriptor() { HandlerName = "handler" };

            settings.LowerHandler = value;

            settings.Serialize()["lower"].ShouldEqual(value);
        }
        
        [Fact]
        public void Default_Mean_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("mean").ShouldBeFalse();
        }

        [Fact]
        public void Mean_should_be_serialized()
        {
            settings.Mean = ChartSeriesAggregate.Avg;

            settings.Serialize()["mean"].ShouldEqual("avg");
        }

        [Fact]
        public void MeanHandler_should_be_serialized()
        {
            var value = new ClientHandlerDescriptor() { HandlerName = "handler" };

            settings.MeanHandler = value;

            settings.Serialize()["mean"].ShouldEqual(value);
        }

        [Fact]
        public void Default_Median_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("median").ShouldBeFalse();
        }

        [Fact]
        public void Median_should_be_serialized()
        {
            settings.Median = ChartSeriesAggregate.Avg;

            settings.Serialize()["median"].ShouldEqual("avg");
        }

        [Fact]
        public void MedianHandler_should_be_serialized()
        {
            var value = new ClientHandlerDescriptor() { HandlerName = "handler" };

            settings.MedianHandler = value;

            settings.Serialize()["median"].ShouldEqual(value);
        }
        
        [Fact]
        public void Default_Q1_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("q1").ShouldBeFalse();
        }

        [Fact]
        public void Q1_should_be_serialized()
        {
            settings.Q1 = ChartSeriesAggregate.Avg;

            settings.Serialize()["q1"].ShouldEqual("avg");
        }

        [Fact]
        public void Q1Handler_should_be_serialized()
        {
            var value = new ClientHandlerDescriptor() { HandlerName = "handler" };

            settings.Q1Handler = value;

            settings.Serialize()["q1"].ShouldEqual(value);
        }


        [Fact]
        public void Default_Q3_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("q3").ShouldBeFalse();
        }

        [Fact]
        public void Q3_should_be_serialized()
        {
            settings.Q3 = ChartSeriesAggregate.Avg;

            settings.Serialize()["q3"].ShouldEqual("avg");
        }

        [Fact]
        public void Q3Handler_should_be_serialized()
        {
            var value = new ClientHandlerDescriptor() { HandlerName = "handler" };

            settings.Q3Handler = value;

            settings.Serialize()["q3"].ShouldEqual(value);
        }
        
        [Fact]
        public void Default_Outliers_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("outliers").ShouldBeFalse();
        }

        [Fact]
        public void Outliers_should_be_serialized()
        {
            settings.Outliers = ChartSeriesAggregate.Avg;

            settings.Serialize()["outliers"].ShouldEqual("avg");
        }

        [Fact]
        public void OutliersHandler_should_be_serialized()
        {
            var value = new ClientHandlerDescriptor() { HandlerName = "handler" };

            settings.OutliersHandler = value;

            settings.Serialize()["outliers"].ShouldEqual(value);
        }

        [Fact]
        public void Default_Upper_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("upper").ShouldBeFalse();
        }

        [Fact]
        public void Upper_should_be_serialized()
        {
            settings.Upper = ChartSeriesAggregate.Avg;

            settings.Serialize()["upper"].ShouldEqual("avg");
        }

        [Fact]
        public void UpperHandler_should_be_serialized()
        {
            var value = new ClientHandlerDescriptor() { HandlerName = "handler" };

            settings.UpperHandler = value;

            settings.Serialize()["upper"].ShouldEqual(value);
        }
    }
}