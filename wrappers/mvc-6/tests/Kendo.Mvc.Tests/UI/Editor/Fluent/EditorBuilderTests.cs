using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Tests
{
    public class EditorBuilderTests
    {
        private readonly Editor editor;
        private readonly EditorBuilder builder;

        public EditorBuilderTests()
        {
            editor = new Editor(TestHelper.CreateViewContext());
            builder = new EditorBuilder(editor);
        }

        [Fact]
        public void Builder_should_set_Encoded()
        {
            var value = true;

            builder.Encoded(value);

            editor.Encoded.ShouldEqual(value);
        }

        [Fact]
        public void Encoded_should_return_builder()
        {
            builder.Encoded(true).ShouldBeSameAs(builder);
        }
        
        [Fact]
        public void Builder_should_set_Stylesheets_with_list()
        {
            var value = "value";

            builder.StyleSheets(x => x.Add(value));

            editor.StyleSheets.ShouldEqual(new List<string>() { value });
        }

        [Fact]
        public void Stylesheets_with_list_should_return_builder()
        {
            builder.StyleSheets(delegate { }).ShouldBeSameAs(builder);
        }
    }
}