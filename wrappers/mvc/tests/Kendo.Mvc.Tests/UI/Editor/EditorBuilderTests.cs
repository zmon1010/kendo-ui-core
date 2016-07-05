namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;
    public class EditorBuilderTests
    {
        private readonly Editor editor;
        private readonly EditorBuilder builder;

        public EditorBuilderTests()
        {
            editor = EditorTestHelper.CreateEditor();
            builder = new EditorBuilder(editor);
        }

        //[Fact]
        //public void Effects_creates_fx_factory()
        //{
        //    var fxFacCreated = false;

        //    builder.Effects(fx =>
        //    {
        //        fxFacCreated = fx != null;
        //    });

        //    Assert.True(fxFacCreated);
        //}

        [Fact]
        public void PasteCleanup_returns_builder()
        {
            builder.PasteCleanup(pasteCleanup => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Immutables()
        {
            var value = true;

            builder.Immutables(true);

            editor.Immutables.Enabled.ShouldEqual(value);
        }

        [Fact]
        public void Builder_should_set_Immutables_Serialization()
        {
            string value = "<div></div>";

            builder.Immutables(i => i.Serialization("<div></div>"));

            editor.Immutables.Serialization.ShouldEqual(value);
        }

        [Fact]
        public void Builder_should_set_Immutables_SerializationHandler()
        {
            string value = "foo";

            builder.Immutables(i => i.SerializationHandler("foo"));

            editor.Immutables.SerializationHandler.HandlerName.ShouldEqual(value);
        }

        [Fact]
        public void Builder_should_set_Immutables_Deserialization()
        {
            string value = "foo";

            builder.Immutables(i => i.Deserialization("foo"));

            editor.Immutables.Deserialization.HandlerName.ShouldEqual(value);
        }
    }
}