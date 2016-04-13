using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Tests
{
    public class EditorToolItemFactoryTests
    {
        private readonly EditorToolItemFactory factory;
        private readonly List<EditorToolItem> items;

        public EditorToolItemFactoryTests()
        {
            items = new List<EditorToolItem>();
            factory = new EditorToolItemFactory(items);
        }

        [Fact]
        public void Builder_should_add_item()
        {
            var text = "text";
            var value = "value";

            factory.Add(text, value);
            
            items[0].Text.ShouldEqual(text);
            items[0].Value.ShouldEqual(value);
        }      
    }
}