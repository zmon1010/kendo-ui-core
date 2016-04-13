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
    }
}