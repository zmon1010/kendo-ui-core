using System;
using Xunit;
using Kendo.Mvc.Extensions.Tests;
using System.Collections.Generic;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class EditorSerializationTests
    {
        private readonly Editor editor;

        public EditorSerializationTests()
        {
            editor = new Editor(TestHelper.CreateViewContext());
        }

        [Fact]
        public void Default_PasteCleanup_should_not_be_serialized()
        {
            editor.AssertSettings(settings =>
            {
                settings.ContainsKey("pasteCleanup").ShouldBeFalse();
            });
        }

        [Fact]
        public void PasteCleanup_should_be_serialized()
        {
            var value = true;

            editor.PasteCleanup.KeepNewLines = value;

            editor.AssertSettings(settings =>
            {
                var pasteCleanup = (IDictionary<string, object>) settings["pasteCleanup"];
                pasteCleanup["keepNewLines"].ShouldEqual(value);
            });
        }

        [Fact]
        public void Default_Pdf_should_not_be_serialized()
        {
            editor.AssertSettings(settings =>
            {
                settings.ContainsKey("pdf").ShouldBeFalse();
            });
        }

        [Fact]
        public void Pdf_should_be_serialized()
        {
            var value = true;

            editor.Pdf.AvoidLinks = value;

            editor.AssertSettings(settings =>
            {
                ((IDictionary<string, object>) settings["pdf"])["avoidLinks"].ShouldEqual(value);
            });
        }

        [Fact]
        public void Default_StyleSheets_should_not_be_serialized()
        {
            editor.AssertSettings(settings =>
            {
                settings.ContainsKey("stylesheets").ShouldBeFalse();
            });
        }

        [Fact]
        public void StyleSheets_should_be_serialized()
        {
            var values = new List<string> { "value1", "value2" };

            editor.StyleSheets = values;

            editor.AssertSettings(settings =>
            {
                settings["stylesheets"].ShouldEqual(values);
            });
        }

        [Fact]
        public void Default_Tools_should_not_be_serialized()
        {
            editor.AssertSettings(settings =>
            {
                settings.ContainsKey("tools").ShouldBeFalse();
            });
        }

        [Fact]
        public void Tools_should_be_serialized()
        {
            editor.Tools = new List<EditorTool>() { new EditorTool() { Name = "FontName" } };

            editor.AssertSettings(settings =>
            {
                settings.ContainsKey("tools").ShouldBeTrue();
            });
        }

        [Fact]
        public void Default_Immutables_should_not_be_serialized()
        {
            editor.AssertSettings(settings =>
            {
                settings.ContainsKey("immutables").ShouldBeFalse();
            });
        }

        [Fact]
        public void Immutables_set_should_be_serialized_With_Enabled_Set()
        {
            editor.Immutables.Enabled = true;
            editor.AssertSettings(settings =>
            {
                settings.ContainsKey("immutables").ShouldBeTrue();
            });
        }

        [Fact]
        public void Immutables_set_should_be_serialized_With_Serialization_Set()
        {
            editor.Immutables.Serialization = "<div></div>";
            editor.AssertSettings(settings =>
            {
                settings.ContainsKey("immutables").ShouldBeTrue();
            });
        }

        [Fact]
        public void Immutables_set_should_be_serialized_With_SerializationHandler_Set()
        {
            editor.Immutables.SerializationHandler = new ClientHandlerDescriptor { HandlerName = "foo" };
            editor.AssertSettings(settings =>
            {
                settings.ContainsKey("immutables").ShouldBeTrue();
            });
        }

        [Fact]
        public void Immutables_set_should_be_serialized_With_Deserialization_Set()
        {
            editor.Immutables.Deserialization = new ClientHandlerDescriptor { HandlerName = "foo" };
            editor.AssertSettings(settings =>
            {
                settings.ContainsKey("immutables").ShouldBeTrue();
            });
        }
    }
}