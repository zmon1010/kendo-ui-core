using System;
using Xunit;
using Kendo.Mvc.Extensions.Tests;
using System.Collections.Generic;
using Kendo.Mvc.Tests;
using Kendo.Mvc.UI.Fluent;

namespace Kendo.Mvc.UI.Tests
{
    public class EditorToolSerializationTests
    {
        private readonly EditorTool tool;
        private readonly EditorToolBuilder builder;

        public EditorToolSerializationTests()
        {
            tool = new EditorTool();
            builder = new EditorToolBuilder(tool);
        }

        [Fact]
        public void Default_StyleSheets_should_not_be_serialized()
        {
            tool.Serialize().ContainsKey("palette").ShouldBeFalse();
        }

        [Fact]
        public void Default_Palette_should_not_be_serialized()
        {
            tool.Serialize().ContainsKey("palette").ShouldBeFalse();
        }

        [Fact]
        public void Palette_should_be_serialized()
        {
            tool.Palette = ColorPickerPalette.WebSafe;

            tool.Serialize()["palette"].ShouldEqual("websafe");
        }

        [Fact]
        public void PaletteColors_should_be_serialized()
        {
            var values = new List<string> { "red" };

            tool.PaletteColors = values;

            tool.Serialize()["palette"].ShouldEqual(values);
        }

        [Fact]
        public void Default_Exec_should_not_be_serialized()
        {
            tool.Serialize().ContainsKey("exec").ShouldBeFalse();
        }

        [Fact]
        public void Exec_should_be_serialized()
        {
            var value = new ClientHandlerDescriptor { TemplateDelegate = delegate (object x) { return 10; } };

            tool.Exec = value;

            tool.Serialize()["exec"].ShouldEqual(value);
        }
    }
}