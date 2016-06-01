using System;
using System.IO;
using Kendo.Mvc.Tests;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using Microsoft.Extensions.WebEncoders;
using Moq;
using Moq.Protected;
using Xunit;
using System.Text.Encodings.Web;

namespace Kendo.Mvc.UI.Tests
{
    public class RadioButtonLabelRenderingTests
    {
        private readonly RadioButton radioButton;
        private readonly RadioButtonHtmlBuilderMock builder;
        private readonly StringWriter writer;

        public RadioButtonLabelRenderingTests()
        {
            radioButton = RadioButtonTestHelper.CreateRadioButton();
            builder = new RadioButtonHtmlBuilderMock(radioButton);
            writer = new StringWriter();
        }

        [Fact]
        public void Builder_should_render_label_element()
        {
            var tag = builder.BuildLabel();

            tag.TagName.ShouldEqual("label");
        }

        [Fact]
        public void Builder_should_render_label_with_for_attribute()
        {
            radioButton.Value = "value";

            var tag = builder.BuildLabel();

            tag.Attribute("for").ShouldEqual(string.Format("{0}_{1}", radioButton.Id, radioButton.Value));
        }

        [Fact]
        public void Builder_should_render_label_with_class_attribute()
        {
            var tag = builder.BuildLabel();

            tag.Attribute("class").ShouldEqual("k-radio-label");
        }

        [Fact]
        public void Builder_should_render_label_text()
        {
            radioButton.Value = "value";
            radioButton.Label = "text";

            var tag = builder.BuildLabel();
            tag.WriteTo(writer, HtmlEncoder.Default);

            writer.ToString().ShouldEqual("<label class=\"k-radio-label\" for=\"RadioButton_value\">text</label>");
        }

        [Fact]
        public void Builder_should_render_default_label_text_from_metadata()
        {
            radioButton.Value = "value";
            builder.MetaDataDisplayName = "text";

            var tag = builder.BuildLabel();
            tag.WriteTo(writer, HtmlEncoder.Default);

            writer.ToString().ShouldEqual("<label class=\"k-radio-label\" for=\"RadioButton_value\">text</label>");
        }
    }
}
