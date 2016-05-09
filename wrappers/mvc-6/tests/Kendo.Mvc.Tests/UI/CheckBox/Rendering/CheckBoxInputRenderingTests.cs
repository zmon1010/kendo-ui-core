using System;
using System.IO;
using Kendo.Mvc.Tests;
using Microsoft.AspNet.Mvc.Rendering;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class CheckBoxInputRenderingTests
    {
        private readonly CheckBox checkBox;
        private readonly StringWriter writer;
        private readonly CheckBoxHtmlBuilderMock builder;

        public CheckBoxInputRenderingTests()
        {
            checkBox = CheckBoxTestHelper.CreateCheckBox();
            builder = new CheckBoxHtmlBuilderMock(checkBox);
            writer = new StringWriter();
        }
        
        [Fact]
        public void CheckBox_should_be_rendered_as_input()
        {
            var tag = builder.BuildCheckBox();

            tag.TagName.ShouldEqual("input");
        }

        [Fact]
        public void CheckBox_should_be_rendered_as_self_closing_tag()
        {
            var tag = builder.BuildCheckBox();

            tag.RenderMode.ShouldEqual(TagRenderMode.SelfClosing);
        }

        [Fact]
        public void CheckBox_should_be_rendered_as_type_checkbox()
        {
            var tag = builder.BuildCheckBox();

            tag.Attribute("type").ShouldEqual("checkbox");
        }

        [Fact]
        public void CheckBox_should_render_k_checkbox_class()
        {
            var tag = builder.BuildCheckBox();

            tag.Attribute("class").Contains("k-checkbox").ShouldBeTrue();
        }

        [Fact]
        public void CheckBox_should_render_name_attribute()
        {
            checkBox.Name = "someName";

            var tag = builder.BuildCheckBox();

            tag.Attribute("name").ShouldEqual("someName");
        }

        [Fact]
        public void CheckBox_should_render_id_attribute()
        {
            checkBox.Name = "someName";

            var tag = builder.BuildCheckBox();

            tag.Attribute("id").ShouldEqual("someName");
        }

        [Fact]
        public void CheckBox_should_render_value_attribute()
        {
            var tag = builder.BuildCheckBox();

            tag.Attribute("value").ShouldEqual("true");
        }

        [Fact]
        public void CheckBox_should_render_checked_attribute()
        {
            checkBox.Checked = true;

            var tag = builder.BuildCheckBox();

            tag.Attribute("checked").ShouldEqual("checked");
        }

        [Fact]
        public void CheckBox_should_render_disabled_attribute()
        {
            checkBox.Enabled = false;

            var tag = builder.BuildCheckBox();

            tag.Attribute("disabled").ShouldEqual("disabled");
        }
        
        [Fact]
        public void CheckBox_should_render_overriden_html_attributes()
        {
            checkBox.Checked = true;
            checkBox.HtmlAttributes.Add("checked", "false");

            var tag = builder.BuildCheckBox();

            tag.Attribute("checked").ShouldEqual("false");
        }
    }
}
