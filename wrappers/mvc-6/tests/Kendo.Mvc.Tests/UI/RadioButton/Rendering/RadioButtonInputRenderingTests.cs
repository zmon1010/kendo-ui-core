using System.IO;
using Kendo.Mvc.Tests;
using Microsoft.AspNetCore.Mvc.Rendering;
using Xunit;
using System.Text.Encodings.Web;

namespace Kendo.Mvc.UI.Tests
{
    public class RadioButtonInputRenderingTests
    {
        private readonly RadioButton radioButton;
        private readonly StringWriter writer;
        private readonly RadioButtonHtmlBuilderMock builder;

        public RadioButtonInputRenderingTests()
        {
            radioButton = RadioButtonTestHelper.CreateRadioButton();
            builder = new RadioButtonHtmlBuilderMock(radioButton);
            writer = new StringWriter();
        }

        [Fact]
        public void RadioButton_should_be_rendered_as_input()
        {
            var tag = builder.BuildRadioButton();

            tag.TagName.ShouldEqual("input");
        }

        [Fact]
        public void RadioButton_should_be_rendered_as_self_closing_tag()
        {
            var tag = builder.BuildRadioButton();

            tag.RenderMode.ShouldEqual(TagRenderMode.SelfClosing);
        }

        [Fact]
        public void RadioButton_should_be_rendered_as_type_radio()
        {
            var tag = builder.BuildRadioButton();

            tag.Attribute("type").ShouldEqual("radio");
        }

        [Fact]
        public void RadioButton_should_render_k_radio_class()
        {
            var tag = builder.BuildRadioButton();

            tag.Attribute("class").Contains("k-radio").ShouldBeTrue();
        }

        [Fact]
        public void RadioButton_should_render_name_attribute()
        {
            radioButton.Name = "someName";

            var tag = builder.BuildRadioButton();

            tag.Attribute("name").ShouldEqual("someName");
        }

        [Fact]
        public void RadioButton_should_render_id_attribute()
        {
            radioButton.Name = "id";
            radioButton.Value = "value";

            var tag = builder.BuildRadioButton();

            tag.Attribute("id").ShouldEqual("id_value");
        }

        [Fact]
        public void RadioButton_should_render_value_attribute()
        {
            radioButton.Value = "someValue";

            var tag = builder.BuildRadioButton();

            tag.Attribute("value").ShouldEqual("someValue");
        }

        [Fact]
        public void RadioButton_should_render_default_value_attribute()
        {
            var tag = builder.BuildRadioButton();

            tag.Attribute("value").ShouldEqual("");
        }

        [Fact]
        public void RadioButton_should_render_checked_attribute()
        {
            radioButton.Checked = true;

            var tag = builder.BuildRadioButton();

            tag.Attribute("checked").ShouldEqual("checked");
        }

        [Fact]
        public void Builder_should_render_default_checked_attribute_from_metadata()
        {
            radioButton.Enabled = true;
            builder.MetaDataChecked = true;

            var tag = builder.BuildRadioButton();
            tag.WriteTo(writer, HtmlEncoder.Default);

            writer.ToString().ShouldEqual("<input checked=\"checked\" class=\"k-radio\" id=\"RadioButton_\" name=\"RadioButton\" type=\"radio\" value=\"\" />");
        }

        [Fact]
        public void RadioButton_should_render_disabled_attribute()
        {
            radioButton.Enabled = false;

            var tag = builder.BuildRadioButton();

            tag.Attribute("disabled").ShouldEqual("disabled");
        }

        [Fact]
        public void RadioButton_should_render_overriden_html_attributes()
        {
            radioButton.Checked = true;
            radioButton.HtmlAttributes.Add("checked", "false");

            var tag = builder.BuildRadioButton();

            tag.Attribute("checked").ShouldEqual("false");
        }
    }
}
