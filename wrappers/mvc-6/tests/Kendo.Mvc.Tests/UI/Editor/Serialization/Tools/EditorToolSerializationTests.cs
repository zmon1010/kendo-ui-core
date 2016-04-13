using System;
using Xunit;
using Kendo.Mvc.Extensions.Tests;
using System.Collections.Generic;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class EditorToolSerializationTests
    {
        private readonly EditorTool tool;

        public EditorToolSerializationTests()
        {
            tool = new EditorTool();
        }

        [Fact]
        public void Default_StyleSheets_should_not_be_serialized()
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
        
    }
}