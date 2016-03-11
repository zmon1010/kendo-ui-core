using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;
using Moq;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartSeriesAggregateSettingsBuilderTests
    {
        private readonly ChartSeriesAggregateSettings<SalesData> settings;
        private readonly ChartSeriesAggregateSettingsBuilder<SalesData> builder;
        private readonly Func<object, object> nullFunction;

        public ChartSeriesAggregateSettingsBuilderTests()
        {
            settings = new ChartSeriesAggregateSettings<SalesData>();
            builder = new ChartSeriesAggregateSettingsBuilder<SalesData>(settings);
            nullFunction = (target) => null;
        }

        [Fact]
        public void Builder_should_set_Close()
        {
            var value = ChartSeriesAggregate.Avg;

            builder.Close(value);

            settings.Close.ShouldEqual(value);
        }

        [Fact]
        public void Close_should_reset_CloseHandler()
        {
            settings.CloseHandler = new ClientHandlerDescriptor() { HandlerName = "handler" };

            builder.Close(ChartSeriesAggregate.Avg);

            settings.CloseHandler.ShouldEqual(null);
        }

        [Fact]
        public void Close_should_return_builder()
        {
            builder.Close(ChartSeriesAggregate.Avg).ShouldBeSameAs(builder);
        }

        [Fact]
        public void CloseHandler_should_reset_Close()
        {
            settings.Close = ChartSeriesAggregate.Avg;

            builder.CloseHandler("handler");

            settings.Close.ShouldEqual(null);
        }

        [Fact]
        public void CloseHandler_with_string_should_return_builder()
        {
            builder.CloseHandler("handler").ShouldBeSameAs(builder);
        }

        [Fact]
        public void CloserHandler_with_function_should_return_builder()
        {
            builder.CloseHandler(nullFunction).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_High()
        {
            var value = ChartSeriesAggregate.Avg;

            builder.High(value);

            settings.High.ShouldEqual(value);
        }

        [Fact]
        public void High_should_reset_HighHandler()
        {
            settings.HighHandler = new ClientHandlerDescriptor() { HandlerName = "handler" };

            builder.High(ChartSeriesAggregate.Avg);

            settings.HighHandler.ShouldEqual(null);
        }

        [Fact]
        public void High_should_return_builder()
        {
            builder.High(ChartSeriesAggregate.Avg).ShouldBeSameAs(builder);
        }

        [Fact]
        public void HighHandler_should_reset_High()
        {
            settings.High = ChartSeriesAggregate.Avg;

            builder.HighHandler("handler");

            settings.High.ShouldEqual(null);
        }

        [Fact]
        public void HighHandler_with_string_should_return_builder()
        {
            builder.HighHandler("handler").ShouldBeSameAs(builder);
        }

        [Fact]
        public void HighrHandler_with_function_should_return_builder()
        {
            builder.HighHandler(nullFunction).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Low()
        {
            var value = ChartSeriesAggregate.Avg;

            builder.Low(value);

            settings.Low.ShouldEqual(value);
        }

        [Fact]
        public void Low_should_reset_LowHandler()
        {
            settings.LowHandler = new ClientHandlerDescriptor() { HandlerName = "handler" };

            builder.Low(ChartSeriesAggregate.Avg);

            settings.LowHandler.ShouldEqual(null);
        }

        [Fact]
        public void Low_should_return_builder()
        {
            builder.Low(ChartSeriesAggregate.Avg).ShouldBeSameAs(builder);
        }

        [Fact]
        public void LowHandler_should_reset_Low()
        {
            settings.Low = ChartSeriesAggregate.Avg;

            builder.LowHandler("handler");

            settings.Low.ShouldEqual(null);
        }

        [Fact]
        public void LowHandler_with_string_should_return_builder()
        {
            builder.LowHandler("handler").ShouldBeSameAs(builder);
        }

        [Fact]
        public void LowrHandler_with_function_should_return_builder()
        {
            builder.LowHandler(nullFunction).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Open()
        {
            var value = ChartSeriesAggregate.Avg;

            builder.Open(value);

            settings.Open.ShouldEqual(value);
        }

        [Fact]
        public void Open_should_reset_OpenHandler()
        {
            settings.OpenHandler = new ClientHandlerDescriptor() { HandlerName = "handler" };

            builder.Open(ChartSeriesAggregate.Avg);

            settings.OpenHandler.ShouldEqual(null);
        }

        [Fact]
        public void Open_should_return_builder()
        {
            builder.Open(ChartSeriesAggregate.Avg).ShouldBeSameAs(builder);
        }

        [Fact]
        public void OpenHandler_should_reset_Open()
        {
            settings.Open = ChartSeriesAggregate.Avg;

            builder.OpenHandler("handler");

            settings.Open.ShouldEqual(null);
        }

        [Fact]
        public void OpenHandler_with_string_should_return_builder()
        {
            builder.OpenHandler("handler").ShouldBeSameAs(builder);
        }

        [Fact]
        public void OpenrHandler_with_function_should_return_builder()
        {
            builder.OpenHandler(nullFunction).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Lower()
        {
            var value = ChartSeriesAggregate.Avg;

            builder.Lower(value);

            settings.Lower.ShouldEqual(value);
        }

        [Fact]
        public void Lower_should_reset_LowerHandler()
        {
            settings.LowerHandler = new ClientHandlerDescriptor() { HandlerName = "handler" };

            builder.Lower(ChartSeriesAggregate.Avg);

            settings.LowerHandler.ShouldEqual(null);
        }

        [Fact]
        public void Lower_should_return_builder()
        {
            builder.Lower(ChartSeriesAggregate.Avg).ShouldBeSameAs(builder);
        }

        [Fact]
        public void LowerHandler_should_reset_Lower()
        {
            settings.Lower = ChartSeriesAggregate.Avg;

            builder.LowerHandler("handler");

            settings.Lower.ShouldEqual(null);
        }

        [Fact]
        public void LowerHandler_with_string_should_return_builder()
        {
            builder.LowerHandler("handler").ShouldBeSameAs(builder);
        }

        [Fact]
        public void LowerrHandler_with_function_should_return_builder()
        {
            builder.LowerHandler(nullFunction).ShouldBeSameAs(builder);
        }
        [Fact]
        public void Builder_should_set_Mean()
        {
            var value = ChartSeriesAggregate.Avg;

            builder.Mean(value);

            settings.Mean.ShouldEqual(value);
        }

        [Fact]
        public void Mean_should_reset_MeanHandler()
        {
            settings.MeanHandler = new ClientHandlerDescriptor() { HandlerName = "handler" };

            builder.Mean(ChartSeriesAggregate.Avg);

            settings.MeanHandler.ShouldEqual(null);
        }

        [Fact]
        public void Mean_should_return_builder()
        {
            builder.Mean(ChartSeriesAggregate.Avg).ShouldBeSameAs(builder);
        }

        [Fact]
        public void MeanHandler_should_reset_Mean()
        {
            settings.Mean = ChartSeriesAggregate.Avg;

            builder.MeanHandler("handler");

            settings.Mean.ShouldEqual(null);
        }

        [Fact]
        public void MeanHandler_with_string_should_return_builder()
        {
            builder.MeanHandler("handler").ShouldBeSameAs(builder);
        }

        [Fact]
        public void MeanrHandler_with_function_should_return_builder()
        {
            builder.MeanHandler(nullFunction).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Median()
        {
            var value = ChartSeriesAggregate.Avg;

            builder.Median(value);

            settings.Median.ShouldEqual(value);
        }

        [Fact]
        public void Median_should_reset_MedianHandler()
        {
            settings.MedianHandler = new ClientHandlerDescriptor() { HandlerName = "handler" };

            builder.Median(ChartSeriesAggregate.Avg);

            settings.MedianHandler.ShouldEqual(null);
        }

        [Fact]
        public void Median_should_return_builder()
        {
            builder.Median(ChartSeriesAggregate.Avg).ShouldBeSameAs(builder);
        }

        [Fact]
        public void MedianHandler_should_reset_Median()
        {
            settings.Median = ChartSeriesAggregate.Avg;

            builder.MedianHandler("handler");

            settings.Median.ShouldEqual(null);
        }

        [Fact]
        public void MedianHandler_with_string_should_return_builder()
        {
            builder.MedianHandler("handler").ShouldBeSameAs(builder);
        }

        [Fact]
        public void MedianrHandler_with_function_should_return_builder()
        {
            builder.MedianHandler(nullFunction).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Outliers()
        {
            var value = ChartSeriesAggregate.Avg;

            builder.Outliers(value);

            settings.Outliers.ShouldEqual(value);
        }

        [Fact]
        public void Outliers_should_reset_OutliersHandler()
        {
            settings.OutliersHandler = new ClientHandlerDescriptor() { HandlerName = "handler" };

            builder.Outliers(ChartSeriesAggregate.Avg);

            settings.OutliersHandler.ShouldEqual(null);
        }

        [Fact]
        public void Outliers_should_return_builder()
        {
            builder.Outliers(ChartSeriesAggregate.Avg).ShouldBeSameAs(builder);
        }

        [Fact]
        public void OutliersHandler_should_reset_Outliers()
        {
            settings.Outliers = ChartSeriesAggregate.Avg;

            builder.OutliersHandler("handler");

            settings.Outliers.ShouldEqual(null);
        }

        [Fact]
        public void OutliersHandler_with_string_should_return_builder()
        {
            builder.OutliersHandler("handler").ShouldBeSameAs(builder);
        }

        [Fact]
        public void OutliersrHandler_with_function_should_return_builder()
        {
            builder.OutliersHandler(nullFunction).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Q1()
        {
            var value = ChartSeriesAggregate.Avg;

            builder.Q1(value);

            settings.Q1.ShouldEqual(value);
        }

        [Fact]
        public void Q1_should_reset_Q1Handler()
        {
            settings.Q1Handler = new ClientHandlerDescriptor() { HandlerName = "handler" };

            builder.Q1(ChartSeriesAggregate.Avg);

            settings.Q1Handler.ShouldEqual(null);
        }

        [Fact]
        public void Q1_should_return_builder()
        {
            builder.Q1(ChartSeriesAggregate.Avg).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Q1Handler_should_reset_Q1()
        {
            settings.Q1 = ChartSeriesAggregate.Avg;

            builder.Q1Handler("handler");

            settings.Q1.ShouldEqual(null);
        }

        [Fact]
        public void Q1Handler_with_string_should_return_builder()
        {
            builder.Q1Handler("handler").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Q1rHandler_with_function_should_return_builder()
        {
            builder.Q1Handler(nullFunction).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Q3()
        {
            var value = ChartSeriesAggregate.Avg;

            builder.Q3(value);

            settings.Q3.ShouldEqual(value);
        }

        [Fact]
        public void Q3_should_reset_Q3Handler()
        {
            settings.Q3Handler = new ClientHandlerDescriptor() { HandlerName = "handler" };

            builder.Q3(ChartSeriesAggregate.Avg);

            settings.Q3Handler.ShouldEqual(null);
        }

        [Fact]
        public void Q3_should_return_builder()
        {
            builder.Q3(ChartSeriesAggregate.Avg).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Q3Handler_should_reset_Q3()
        {
            settings.Q3 = ChartSeriesAggregate.Avg;

            builder.Q3Handler("handler");

            settings.Q3.ShouldEqual(null);
        }

        [Fact]
        public void Q3Handler_with_string_should_return_builder()
        {
            builder.Q3Handler("handler").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Q3rHandler_with_function_should_return_builder()
        {
            builder.Q3Handler(nullFunction).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Upper()
        {
            var value = ChartSeriesAggregate.Avg;

            builder.Upper(value);

            settings.Upper.ShouldEqual(value);
        }

        [Fact]
        public void Upper_should_reset_UpperHandler()
        {
            settings.UpperHandler = new ClientHandlerDescriptor() { HandlerName = "handler" };

            builder.Upper(ChartSeriesAggregate.Avg);

            settings.UpperHandler.ShouldEqual(null);
        }

        [Fact]
        public void Upper_should_return_builder()
        {
            builder.Upper(ChartSeriesAggregate.Avg).ShouldBeSameAs(builder);
        }

        [Fact]
        public void UpperHandler_should_reset_Upper()
        {
            settings.Upper = ChartSeriesAggregate.Avg;

            builder.UpperHandler("handler");

            settings.Upper.ShouldEqual(null);
        }

        [Fact]
        public void UpperHandler_with_string_should_return_builder()
        {
            builder.UpperHandler("handler").ShouldBeSameAs(builder);
        }

        [Fact]
        public void UpperrHandler_with_function_should_return_builder()
        {
            builder.UpperHandler(nullFunction).ShouldBeSameAs(builder);
        }
    }
}