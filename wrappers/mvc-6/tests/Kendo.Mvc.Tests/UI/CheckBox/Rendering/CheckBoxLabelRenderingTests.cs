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
    public class CheckBoxLabelRenderingTests
    {
        private readonly CheckBox checkBox;
        private readonly CheckBoxHtmlBuilderMock builder;
        private readonly StringWriter writer;

        public CheckBoxLabelRenderingTests()
        {
            checkBox = CheckBoxTestHelper.CreateCheckBox();
            builder = new CheckBoxHtmlBuilderMock(checkBox);
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
            var tag = builder.BuildLabel();

            tag.Attribute("for").ShouldEqual(checkBox.Id);
        }

        [Fact]
        public void Builder_should_render_label_with_class_attribute()
        {
            var tag = builder.BuildLabel();

            tag.Attribute("class").ShouldEqual("k-checkbox-label");
        }

        [Fact]
        public void Builder_should_render_label_text()
        {
            checkBox.Label = "value";

            var tag = builder.BuildLabel();
            tag.WriteTo(writer, HtmlEncoder.Default);

            writer.ToString().ShouldEqual("<label class=\"k-checkbox-label\" for=\"CheckBox\">value</label>");
        }

        [Fact]
        public void Builder_should_render_default_label_text_from_metadata()
        {
            builder.MetaDataDisplayName = "text";

            var tag = builder.BuildLabel();
            tag.WriteTo(writer, HtmlEncoder.Default);

            writer.ToString().ShouldEqual("<label class=\"k-checkbox-label\" for=\"CheckBox\">text</label>");
        }
    }
}
