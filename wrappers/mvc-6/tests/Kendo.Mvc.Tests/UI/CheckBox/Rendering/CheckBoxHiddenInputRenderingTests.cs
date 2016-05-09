using System;
using System.IO;
using Kendo.Mvc.Tests;
using Microsoft.AspNet.Mvc.Rendering;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class CheckBoxHiddenInputRenderingTests
    {
        private readonly CheckBox checkBox;
        private readonly CheckBoxHtmlBuilderMock builder;

        public CheckBoxHiddenInputRenderingTests()
        {
            checkBox = CheckBoxTestHelper.CreateCheckBox();
            builder = new CheckBoxHtmlBuilderMock(checkBox);
        }

        [Fact]
        public void Builder_should_render_input()
        {
            var tag = builder.BuildHiddenInput();

            tag.TagName.ShouldEqual("input");
        }

        [Fact]
        public void Builder_should_render_input_as_self_closing_tag()
        {
            var tag = builder.BuildHiddenInput();

            tag.RenderMode.ShouldEqual(TagRenderMode.SelfClosing);
        }

        [Fact]
        public void Builder_should_render_input_with_type_hidden()
        {
            var tag = builder.BuildHiddenInput();

            tag.Attribute("type").ShouldEqual("hidden");
        }

        [Fact]
        public void Builder_should_render_hidden_input_with_name_attribute()
        {
            var tag = builder.BuildHiddenInput();

            tag.Attribute("name").ShouldEqual(checkBox.Name);
        }

        [Fact]
        public void Builder_should_render_hidden_input_with_value_attribute()
        {
            var tag = builder.BuildHiddenInput();

            tag.Attribute("value").ShouldEqual("false");
        }
    }
}
