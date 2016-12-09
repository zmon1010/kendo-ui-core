namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.UI;
    using System;
    using Xunit;

    public class GridActionCommandBuilderTests
    {
        internal static GridActionCommandBaseDouble command;
        internal static GridActionCommandBuilderBaseDouble builder;

        public GridActionCommandBuilderTests()
        {
            command = new GridActionCommandBaseDouble();
            builder = new GridActionCommandBuilderBaseDouble(command);
        }

        [Fact]
        public void HtmlAttributes_should_set_HtmlAttributes_property()
        {
            var style = new { style = "width:10px" };

            builder.HtmlAttributes(style);

            Assert.Equal(style.style.ToString(), command.HtmlAttributes["style"].ToString());
        }

        [Fact]
        public void HtmlAttributes_should_return_builder()
        {
            var style = new { style = "width:10px" };

            Assert.IsType(typeof(GridActionCommandBuilderBaseDouble), builder.HtmlAttributes(style));
        }

        [Fact]
        public void Visible_string_handler_is_set_as_expected()
        {
            builder.Visible("myCustomVisiblekHandler");
            Assert.Equal(command.Visible.HandlerName, "myCustomVisiblekHandler");
        }

        [Fact]
        public void Visible_TemplateDelegate_is_set_as_expected()
        {
            Func<object, object> handler = t => t;
            builder.Visible(handler);
            Assert.Equal(command.Visible.TemplateDelegate, handler);
        }

    }

    public class GridActionCommandBaseDouble : GridActionCommandBase 
    {
        public GridActionCommandBaseDouble() : base() { }

        public override string Name
        {
            get { throw new System.NotImplementedException(); }
        }
    }

    public class GridActionCommandBuilderBaseDouble : GridActionCommandBuilderBase<GridActionCommandBase, GridActionCommandBuilderBaseDouble>
    {
        public GridActionCommandBuilderBaseDouble(GridActionCommandBase command) : base(command) { }
    }
}
