using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Tests
{
    public class EditorToolItemFactoryTests
    {
        private readonly EditorToolItemFactory builder;
        private readonly List<EditorToolItem> items;

        public EditorToolItemFactoryTests()
        {
            items = new List<EditorToolItem>();
            builder = new EditorToolItemFactory(items);
        }

        [Fact]
        public void Builder_should_add_item()
        {
            var text = "text";
            var value = "value";

            builder.Add(text, value);

            items.Count.ShouldEqual(1);
            items[0].Text.ShouldEqual(text);
            items[0].Value.ShouldEqual(value);
        }

        [Fact]
        public void Add_should_return_builder()
        {
            var text = "text";
            var value = "value";

            builder.Add(text, value).ShouldBeSameAs(builder);
        }
    }
}