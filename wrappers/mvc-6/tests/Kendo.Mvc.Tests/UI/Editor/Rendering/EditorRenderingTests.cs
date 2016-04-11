using Xunit;
using Kendo.Mvc.Tests;
using System.Collections.Generic;
using System.IO;
using Moq;
using Kendo.Mvc.UI.Fluent;
using System;

namespace Kendo.Mvc.UI.Tests
{
    public class EditorRenderingTests
    {
        private readonly EditorMock editor;
        private readonly StringWriter writer;
        private readonly Func<object, object> contentFunction;
        private const string HTML_CONTENT = "<p>text</p>";
        private const string EDITOR_SCRIPT_DEFINITION =
            "<script>jQuery(" +
                "function(){" +
                    "jQuery(\"#EditorMock\").kendoEditor({" +
                        "\"imageBrowser\":{\"fileTypes\":\"*.png,*.gif,*.jpg,*.jpeg\"}," +
                        "\"fileBrowser\":{\"fileTypes\":\"*.*\"}" +
                    "});" +
                "});" +
            "</script>";

        public EditorRenderingTests()
        {
            editor = EditorTestHelper.CreateEditorMock();
            writer = new StringWriter();
            contentFunction = (parameter) => { return HTML_CONTENT; };
        }

        [Fact]
        public void Editor_should_be_rendered_as_textarea_by_default()
        {
            var html = editor.ToHtmlString();

            html.ShouldEqual("<textarea cols=\"20\" id=\"EditorMock\" name=\"EditorMock\" rows=\"5\"></textarea>" + EDITOR_SCRIPT_DEFINITION);
        }

        [Fact]
        public void Editor_should_be_rendered_with_contentEditable_attribute()
        {
            editor.Tag = "span";

            var html = editor.ToHtmlString();

            html.ShouldEqual("<span contentEditable=\"true\" id=\"EditorMock\" name=\"EditorMock\"></span>" + EDITOR_SCRIPT_DEFINITION);
        }

        [Fact]
        public void Editor_should_be_rendered_with_default_cols_attribute()
        {
            var tag = editor.GenerateTag(writer);

            tag.Attributes["cols"].ShouldEqual("20");
        }

        [Fact]
        public void Editor_should_be_rendered_with_default_rows_attribute()
        {
            var tag = editor.GenerateTag(writer);

            tag.Attributes["rows"].ShouldEqual("5");
        }

        [Fact]
        public void Editor_should_be_rendered_with_custom_attribute()
        {
            editor.HtmlAttributes.Add("some-attribute", "value");

            var html = editor.ToHtmlString();

            html.ShouldEqual("<textarea cols=\"20\" id=\"EditorMock\" name=\"EditorMock\" rows=\"5\" some-attribute=\"value\"></textarea>" + EDITOR_SCRIPT_DEFINITION);
        }

        [Fact]
        public void Editor_should_be_rendered_with_merged_attributes()
        {
            var attribute = "rows";
            var value = "100";
            editor.HtmlAttributes.Add(attribute, value);

            var tag = editor.GenerateTag(writer);

            tag.Attributes[attribute].ShouldEqual(value);
        }

        [Fact]
        public void Value_should_be_encoded_when_Editor_is_textarea()
        {
            editor.Value = HTML_CONTENT;

            var html = editor.ToHtmlString();

            html.ShouldEqual("<textarea cols=\"20\" id=\"EditorMock\" name=\"EditorMock\" rows=\"5\">&lt;p&gt;text&lt;/p&gt;</textarea>" + EDITOR_SCRIPT_DEFINITION);
        }

        [Fact]
        public void Value_should_not_be_encoded_in_inline_edit_mode()
        {
            editor.Tag = "div";
            editor.Value = HTML_CONTENT;

            var html = editor.ToHtmlString();

            html.ShouldEqual("<div contentEditable=\"true\" id=\"EditorMock\" name=\"EditorMock\">" + HTML_CONTENT + "</div>" + EDITOR_SCRIPT_DEFINITION);
        }

        [Fact]
        public void Builder_should_encode_Value_when_Editor_is_textarea()
        {
            var builder = new EditorBuilder(editor);
            builder.Value(contentFunction);

            var html = editor.ToHtmlString();

            html.ShouldEqual("<textarea cols=\"20\" id=\"EditorMock\" name=\"EditorMock\" rows=\"5\">&lt;p&gt;text&lt;/p&gt;</textarea>" + EDITOR_SCRIPT_DEFINITION);
        }

        [Fact]
        public void Builder_should_not_encode_Value_in_ineline_edit_mode()
        {
            editor.Tag = "div";
            var builder = new EditorBuilder(editor);
            builder.Value(contentFunction);

            var html = editor.ToHtmlString();

            html.ShouldEqual("<div contentEditable=\"true\" id=\"EditorMock\" name=\"EditorMock\">" + HTML_CONTENT + "</div>" + EDITOR_SCRIPT_DEFINITION);
        }
    }
}