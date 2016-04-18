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
        private readonly Func<object, object> nullFunction;

        public EditorBuilderTests()
        {
            editor = new Editor(TestHelper.CreateViewContext());
            builder = new EditorBuilder(editor);
            nullFunction = (parameter) => null;
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
        public void Builder_should_set_PasteCleanup()
        {
            var value = true;

            builder.PasteCleanup(x => x.KeepNewLines(value));

            editor.PasteCleanup.KeepNewLines.ShouldEqual(value);
        }

        [Fact]
        public void PasteCleanup_should_return_builder()
        {
            builder.PasteCleanup(delegate { }).ShouldBeSameAs(builder);
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

        [Fact]
        public void Builder_should_set_Value_with_string()
        {
            var value = "value";

            builder.Value(value);

            editor.Value.ShouldEqual(value);
        }

        [Fact]
        public void Value_with_string_should_return_builder()
        {
            builder.Value("value").ShouldBeSameAs(builder);
        }
        
        [Fact]
        public void Value_with_Action_should_return_builder()
        {
            builder.Value(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Value_with_Func_should_return_builder()
        {
            builder.Value(nullFunction).ShouldBeSameAs(builder);
        }
    }
}