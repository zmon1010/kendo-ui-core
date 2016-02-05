using System;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Xunit;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent.Tests
{
    public class TreeMapEventBuilderTests
    {
        private readonly TreeMapEventBuilder builder;
        private readonly IDictionary<string, object> clientEvents;
        private readonly Action emptyAction;
        private readonly Func<object, object> nullFunction;
        private readonly string handlerName;

        public TreeMapEventBuilderTests()
        {
            clientEvents = new Dictionary<string, object>();
            builder = new TreeMapEventBuilder(clientEvents);
            emptyAction = () => { };
            nullFunction = (o) => null;
            handlerName = "myHandler";
        }

        [Fact]
        public void ItemCreated_event_with_function_sets_inline_code_block()
        {
            builder.ItemCreated(nullFunction);
            clientEvents["itemCreated"].ShouldNotBeNull();
        }

        [Fact]
        public void ItemCreated_event_with_function_returns_builder()
        {
            builder.ItemCreated(nullFunction).ShouldBeType<TreeMapEventBuilder>();
        }

        [Fact]
        public void ItemCreated_event_with_string_sets_HandlerName()
        {
            builder.ItemCreated(handlerName);
            ((ClientHandlerDescriptor) clientEvents["itemCreated"]).HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void ItemCreated_event_with_string_returns_builder()
        {
            builder.ItemCreated(handlerName).ShouldBeType<TreeMapEventBuilder>();
        }

        [Fact]
        public void DataBound_event_with_function_sets_inline_code_block()
        {
            builder.DataBound(nullFunction);
            clientEvents["dataBound"].ShouldNotBeNull();
        }

        [Fact]
        public void DataBound_event_with_function_returns_builder()
        {
            builder.DataBound(nullFunction).ShouldBeType<TreeMapEventBuilder>();
        }

        [Fact]
        public void DataBound_event_with_string_sets_HandlerName()
        {
            builder.DataBound(handlerName);
            ((ClientHandlerDescriptor) clientEvents["dataBound"]).HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void DataBound_event_with_string_returns_builder()
        {
            builder.DataBound(handlerName).ShouldBeType<TreeMapEventBuilder>();
        }


    }
}