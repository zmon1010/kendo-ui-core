namespace Kendo.Mvc.UI.Tests
{
    using System;
    using Fluent;
    using Kendo.Mvc.Tests;
    using Xunit;

    public class DialogActionBuilderTests
    {
        private DialogActionBuilder builder;
        private DialogAction action;

        public DialogActionBuilderTests()
        {
            action = new DialogAction();
            builder = new DialogActionBuilder(action);
        }

        [Fact]
        public void Text_sets_Text_property()
        {
            const string text = "text";

            builder.Text(text);

            action.Text.ShouldBeSameAs(text);
        }

        [Fact]
        public void Text_returns_builder()
        {
            builder.Text("").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Action_sets_Action_property()
        {
            const string handler = "text";

            builder.Action(handler);

            action.Action.HandlerName.ShouldEqual(handler);
        }

        [Fact]
        public void Action_returns_builder()
        {
            builder.Action("").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Primary_sets_Primary_property()
        {
            const bool value = true;

            builder.Primary(value);

            action.Primary.ShouldEqual(value);
        }

        [Fact]
        public void Primary_returns_builder()
        {
            builder.Primary(true).ShouldBeSameAs(builder);
        }


    }
}