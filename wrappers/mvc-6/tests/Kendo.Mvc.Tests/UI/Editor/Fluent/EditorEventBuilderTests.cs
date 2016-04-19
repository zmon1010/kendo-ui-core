using Xunit;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using System;

namespace Kendo.Mvc.UI.Tests
{
    public class EditorEventBuilderTests
    {
        private readonly Editor editor;
        private readonly EditorEventBuilder builder;
        private readonly Func<object, object> nullFunction;

        public EditorEventBuilderTests()
        {
            editor = new Editor(TestHelper.CreateViewContext());
            builder = new EditorEventBuilder(editor.Events);
            nullFunction = (function) => null;
        }

        [Fact]
        public void Builder_should_set_Keydown()
        {
            var value = "value";

            builder.Keydown(value);

            ((ClientHandlerDescriptor) editor.Events["keydown"]).HandlerName.ShouldEqual(value);
        }

        [Fact]
        public void Keydown_should_return_builder()
        {
            builder.Keydown("value").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Keydown_with_handler()
        {
            builder.Keydown(nullFunction);

            ((ClientHandlerDescriptor) editor.Events["keydown"]).TemplateDelegate.ShouldEqual(nullFunction);
        }

        [Fact]
        public void Keydown_with_handler_should_return_builder()
        {
            builder.Keydown(nullFunction).ShouldBeSameAs(builder);
        }
    }
}