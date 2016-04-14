using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Tests
{
    public class EditorToolFactoryTests
    {
        private readonly EditorToolFactory builder;
        private readonly List<EditorTool> items;

        public EditorToolFactoryTests()
        {
            items = new List<EditorTool>();
            builder = new EditorToolFactory(items);
        }

        [Fact]
        public void Builder_should_create_Bold_tool()
        {
            builder.Bold();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("bold");
        }

        [Fact]
        public void Bold_should_return_builder()
        {
            builder.Bold().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_CleanFormatting_tool()
        {
            builder.CleanFormatting();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("cleanFormatting");
        }

        [Fact]
        public void CleanFormatting_should_return_builder()
        {
            builder.CleanFormatting().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_CreateLink_tool()
        {
            builder.CreateLink();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("createLink");
        }

        [Fact]
        public void CreateLink_should_return_builder()
        {
            builder.CreateLink().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_Indent_tool()
        {
            builder.Indent();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("indent");
        }

        [Fact]
        public void Indent_should_return_builder()
        {
            builder.Indent().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_InsertFile_tool()
        {
            builder.InsertFile();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("insertFile");
        }

        [Fact]
        public void InsertFile_should_return_builder()
        {
            builder.InsertFile().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_InsertImage_tool()
        {
            builder.InsertImage();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("insertImage");
        }

        [Fact]
        public void InsertImage_should_return_builder()
        {
            builder.InsertImage().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_InsertOrderedList_tool()
        {
            builder.InsertOrderedList();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("insertOrderedList");
        }

        [Fact]
        public void InsertOrderedList_should_return_builder()
        {
            builder.InsertOrderedList().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_InsertUnorderedList_tool()
        {
            builder.InsertUnorderedList();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("insertUnorderedList");
        }

        [Fact]
        public void InsertUnorderedList_should_return_builder()
        {
            builder.InsertUnorderedList().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_Italic_tool()
        {
            builder.Italic();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("italic");
        }

        [Fact]
        public void Italic_should_return_builder()
        {
            builder.Italic().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_JustifyCenter_tool()
        {
            builder.JustifyCenter();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("justifyCenter");
        }

        [Fact]
        public void JustifyCenter_should_return_builder()
        {
            builder.JustifyCenter().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_JustifyFull_tool()
        {
            builder.JustifyFull();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("justifyFull");
        }

        [Fact]
        public void JustifyFull_should_return_builder()
        {
            builder.JustifyFull().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_JustifyLeft_tool()
        {
            builder.JustifyLeft();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("justifyLeft");
        }

        [Fact]
        public void JustifyLeft_should_return_builder()
        {
            builder.JustifyLeft().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_JustifyRight_tool()
        {
            builder.JustifyRight();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("justifyRight");
        }

        [Fact]
        public void JustifyRight_should_return_builder()
        {
            builder.JustifyRight().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_Outdent_tool()
        {
            builder.Outdent();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("outdent");
        }

        [Fact]
        public void Outdent_should_return_builder()
        {
            builder.Outdent().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_Pdf_tool()
        {
            builder.Pdf();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("pdf");
        }

        [Fact]
        public void Pdf_should_return_builder()
        {
            builder.Pdf().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_Print_tool()
        {
            builder.Print();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("print");
        }

        [Fact]
        public void Print_should_return_builder()
        {
            builder.Print().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_Separator_tool()
        {
            builder.Separator();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("separator");
        }

        [Fact]
        public void Separator_should_return_builder()
        {
            builder.Separator().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_Strikethrough_tool()
        {
            builder.Strikethrough();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("strikethrough");
        }

        [Fact]
        public void Strikethrough_should_return_builder()
        {
            builder.Strikethrough().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_Subscript_tool()
        {
            builder.Subscript();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("subscript");
        }

        [Fact]
        public void Subscript_should_return_builder()
        {
            builder.Subscript().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_Superscript_tool()
        {
            builder.Superscript();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("superscript");
        }

        [Fact]
        public void Superscript_should_return_builder()
        {
            builder.Superscript().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_Underline_tool()
        {
            builder.Underline();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("underline");
        }

        [Fact]
        public void Underline_should_return_builder()
        {
            builder.Underline().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_Unlink_tool()
        {
            builder.Unlink();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("unlink");
        }

        [Fact]
        public void Unlink_should_return_builder()
        {
            builder.Unlink().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_ViewHtml_tool()
        {
            builder.ViewHtml();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("viewHtml");
        }

        [Fact]
        public void ViewHtml_should_return_builder()
        {
            builder.ViewHtml().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_FontName_tool()
        {
            builder.FontName();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("fontName");
        }

        [Fact]
        public void FontName_should_return_builder()
        {
            builder.FontName().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_FontName_tool_items()
        {
            var text = "text";
            var value = "value";

            builder.FontName(x => x.Add(text, value));

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("fontName");
            items[0].Items[0].Text.ShouldEqual(text);
            items[0].Items[0].Value.ShouldEqual(value);
        }

        [Fact]
        public void Builder_should_create_FontSize_tool()
        {
            builder.FontSize();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("fontSize");
        }

        [Fact]
        public void FontSize_should_return_builder()
        {
            builder.FontSize().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_FontSize_tool_items()
        {
            var text = "text";
            var value = "value";

            builder.FontSize(x => x.Add(text, value));

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("fontSize");
            items[0].Items[0].Text.ShouldEqual(text);
            items[0].Items[0].Value.ShouldEqual(value);
        }

        [Fact]
        public void Builder_should_create_Formatting_tool()
        {
            builder.Formatting();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("formatting");
        }

        [Fact]
        public void Formatting_should_return_builder()
        {
            builder.Formatting().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Formatting_tool_items()
        {
            var text = "text";
            var value = "value";

            builder.Formatting(x => x.Add(text, value));

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("formatting");
            items[0].Items[0].Text.ShouldEqual(text);
            items[0].Items[0].Value.ShouldEqual(value);
        }

        [Fact]
        public void Builder_should_create_BackColor_tool()
        {
            builder.BackColor();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("backColor");
        }

        [Fact]
        public void BackColor_should_return_builder()
        {
            builder.BackColor().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_BackColor_tool_palette()
        {
            builder.BackColor(x => x.Palette(ColorPickerPalette.WebSafe));

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("backColor");
            items[0].Palette.ShouldEqual(ColorPickerPalette.WebSafe);
        }

        [Fact]
        public void Builder_should_create_ForeColor_tool()
        {
            builder.ForeColor();

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("foreColor");
        }

        [Fact]
        public void ForeColor_should_return_builder()
        {
            builder.ForeColor().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_create_ForeColor_tool_palette()
        {
            builder.ForeColor(x => x.Palette(ColorPickerPalette.WebSafe));

            items.Count.ShouldEqual(1);
            items[0].Name.ShouldEqual("foreColor");
            items[0].Palette.ShouldEqual(ColorPickerPalette.WebSafe);
        }
        [Fact]
        public void Builder_should_create_TableEditing_tool()
        {
            builder.TableEditing();

            items.Count.ShouldEqual(7);
            items[0].Name.ShouldEqual("addColumnLeft");
            items[1].Name.ShouldEqual("addColumnRight");
            items[2].Name.ShouldEqual("addRowAbove");
            items[3].Name.ShouldEqual("addRowBelow");
            items[4].Name.ShouldEqual("createTable");
            items[5].Name.ShouldEqual("deleteColumn");
            items[6].Name.ShouldEqual("deleteRow");
        }

        [Fact]
        public void TableEditing_should_return_builder()
        {
            builder.TableEditing().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_Clear_all_tools()
        {
            builder.Bold().Italic().Underline();

            builder.Clear();

            items.Count.ShouldEqual(0);
        }

        [Fact]
        public void Clear_should_return_builder()
        {
            builder.Clear().ShouldBeSameAs(builder);
        }
    }
}