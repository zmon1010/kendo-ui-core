using System;
using System.Linq;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class ImmutablesBuilderTests
    {
        private readonly EditorImmutablesSettings settings;
        private readonly EditorImmutablesSettingsBuilder builder;

        public ImmutablesBuilderTests()
        {
            settings = new EditorImmutablesSettings();
            builder = new EditorImmutablesSettingsBuilder(settings);
        }

        [Fact]
        public void Set_Serialization()
        {
            string value = "<div></div>";
            builder.Serialization("<div></div>");
            settings.Serialization.ShouldEqual(value);
        }

        [Fact]
        public void Set_SerializationHandler()
        {
            string value = "foo";
            builder.SerializationHandler("foo");
            settings.SerializationHandler.HandlerName.ShouldEqual(value);
        }

        [Fact]
        public void Set_DeserializationHandler()
        {
            string value = "foo";
            builder.Deserialization("foo");
            settings.Deserialization.HandlerName.ShouldEqual(value);
        }
    }
}
