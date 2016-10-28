namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using System;
    using Xunit;

    public class EditorImportBuilderTests
    {
        private readonly EditorImportSettings editorImportSettings;
        private readonly EditorImportSettingsBuilder builder;
        private Func<object, object> templateDelegate = new Func<object, object>(x => x);

        public EditorImportBuilderTests()
        {
            editorImportSettings = new EditorImportSettings(null);
            builder = new EditorImportSettingsBuilder(editorImportSettings);
        }

        [Fact]
        public void Proxy_returns_builder()
        {
            builder.Proxy("Import", "Editor").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_sets_Proxy()
        {
            builder.Proxy("Import", "Editor");

            editorImportSettings.Proxy.ActionName.ShouldEqual("Import");
            editorImportSettings.Proxy.ControllerName.ShouldEqual("Editor");
        }

        [Fact]
        public void AllowedExtensions_returns_builder()
        {
            builder.AllowedExtensions(new string[] { ".pdf" }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_sets_AllowedExtensions()
        {
            var extensions = new string[] { ".pdf" };
            builder.AllowedExtensions(extensions);
            editorImportSettings.AllowedExtensions.ShouldEqual(extensions);
        }

        [Fact]
        public void MaxFileSize_returns_builder()
        {
            builder.MaxFileSize(10).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_sets_MaxFileSize()
        {
            builder.MaxFileSize(10);
            editorImportSettings.MaxFileSize.ShouldEqual(10.00);
        }

        [Fact]
        public void Error_returns_builder()
        {
            builder.Error("Error").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_sets_Error_HandlerName()
        {
            builder.Error("Error");
            editorImportSettings.Error.HandlerName.ShouldEqual("Error");
        }

        [Fact]
        public void Builder_sets_Error_TemplateDelegate()
        {
            builder.Error(templateDelegate);
            editorImportSettings.Error.TemplateDelegate.ShouldEqual(templateDelegate);
        }

        [Fact]
        public void Complete_returns_builder()
        {
            builder.Complete("Complete").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_sets_Complete_HandlerName()
        {
            builder.Complete("Complete");
            editorImportSettings.Complete.HandlerName.ShouldEqual("Complete");
        }

        [Fact]
        public void Builder_sets_Complete_TemplateDelegate()
        {
            builder.Complete(templateDelegate);
            editorImportSettings.Complete.TemplateDelegate.ShouldEqual(templateDelegate);
        }

        [Fact]
        public void Progress_returns_builder()
        {
            builder.Progress("Progress").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_sets_Progress_HandlerName()
        {
            builder.Progress("Progress");
            editorImportSettings.Progress.HandlerName.ShouldEqual("Progress");
        }

        [Fact]
        public void Builder_sets_Progress_TemplateDelegate()
        {
            builder.Progress(templateDelegate);
            editorImportSettings.Progress.TemplateDelegate.ShouldEqual(templateDelegate);
        }

        [Fact]
        public void Select_returns_builder()
        {
            builder.Select("Select").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_sets_Select_HandlerName()
        {
            builder.Select("Select");
            editorImportSettings.Select.HandlerName.ShouldEqual("Select");
        }

        [Fact]
        public void Builder_sets_Select_TemplateDelegate()
        {
            builder.Select(templateDelegate);
            editorImportSettings.Select.TemplateDelegate.ShouldEqual(templateDelegate);
        }

        [Fact]
        public void Success_returns_builder()
        {
            builder.Success("success").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_sets_Success_HandlerName()
        {
            builder.Success("success");
            editorImportSettings.Success.HandlerName.ShouldEqual("success");
        }

        [Fact]
        public void Builder_sets_Success_TemplateDelegate()
        {
            builder.Success(templateDelegate);
            editorImportSettings.Success.TemplateDelegate.ShouldEqual(templateDelegate);
        }
    }
}