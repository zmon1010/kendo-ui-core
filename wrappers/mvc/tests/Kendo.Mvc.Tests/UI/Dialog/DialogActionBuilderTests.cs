namespace Kendo.Mvc.UI.Tests
{
    using System;
    using Fluent;
    using Xunit;

    public class DialogActionBuilderTests
    {
        private readonly DialogActionBuilder builder;
        private readonly DialogAction container;

        public DialogActionBuilderTests()
        {
            container = new DialogAction();
            builder = new DialogActionBuilder(container);
        }

        [Fact]
        public void Text_sets_Text_property()
        {
            const string text = "action text";
            builder.Text(text);

            container.Text.ShouldEqual(text);
        }

        [Fact]
        public void Primary_sets_Primary_property()
        {
            const bool primary = true;
            builder.Primary(primary);

            container.Primary.ShouldEqual(primary);
        }

        [Fact]
        public void Acrion_sets_Action_property()
        {
            const string action = "handler";
            builder.Action(action);
            
            container.Action.HandlerName.ShouldEqual(action);
        }


    }
}