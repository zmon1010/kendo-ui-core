using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Tests
{
    public class EditorToolFactoryTests
    {
        private readonly EditorToolFactory factory;
        private readonly List<EditorTool> items;

        public EditorToolFactoryTests()
        {
            items = new List<EditorTool>();
            factory = new EditorToolFactory(items);
        }
                
        [Fact]
        public void Builder_should_create_Bold_tool()
        {
            factory.Bold();

            items[0].Name.ShouldEqual("bold");
        }

        [Fact]
        public void Builder_should_create_FontName_tool()
        {
            factory.FontName();

            items[0].Name.ShouldEqual("fontName");
        }

        [Fact]
        public void Builder_should_set_FontName_tool_items()
        {
            var text = "text";
            var value = "value";

            factory.FontName(x => x.Add(text, value));

            items[0].Name.ShouldEqual("fontName");
            items[0].Items[0].Text.ShouldEqual(text);
            items[0].Items[0].Value.ShouldEqual(value);
        }        
    }
}