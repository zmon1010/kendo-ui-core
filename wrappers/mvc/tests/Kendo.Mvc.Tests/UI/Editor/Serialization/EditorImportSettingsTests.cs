namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class EditorSerializeTests
    {
        private readonly EditorImportSettings importSettings;
        private Func<object, object> templateDelegate = new Func<object, object>(x => x);
        private string handler = "handler";

        public EditorSerializeTests()
        {
            importSettings = new EditorImportSettings(EditorTestHelper.CreateEditor());
        }

        [Fact]
        public void Proxy_sets_Proxy()
        {
            importSettings.Proxy.ActionName = "Import";
            importSettings.Proxy.ControllerName = "Editor";

            GetJson().ContainsKey("proxyUrl").ShouldBeTrue();
        }

        [Fact]
        public void Null_Proxy_is_not_set()
        {
            GetJson().ContainsKey("proxyUrl").ShouldBeFalse();
        }

        [Fact]
        public void AllowedExtensions_sets_AllowedExtensions()
        {
            var extensions = new string[] { ".pdf" };
            importSettings.AllowedExtensions = extensions;

            GetJson()["allowedExtensions"].ShouldEqual(extensions);
        }

        [Fact]
        public void Null_AllowedExtensions_is_not_set()
        {
            GetJson().ContainsKey("allowedExtensions").ShouldBeFalse();
        }

        [Fact]
        public void MaxFileSize_sets_MaxFileSize()
        {
            importSettings.MaxFileSize = 10;

            GetJson()["maxFileSize"].ShouldEqual(10.00);
        }

        [Fact]
        public void Null_MaxFileSize_is_not_set()
        {
            GetJson().ContainsKey("maxFileSize").ShouldBeFalse();
        }

        [Fact]
        public void Complete_HandlerName_sets_Complete_HandlerName()
        {
            importSettings.Complete.HandlerName = handler;

            Assert.Equal((GetJson()["complete"] as ClientHandlerDescriptor).HandlerName, handler);
        }

        [Fact]
        public void Complete_TemplateDelegate_sets_Complete_TemplateDelegate()
        {
            importSettings.Complete.TemplateDelegate = templateDelegate;

            Assert.Equal((GetJson()["complete"] as ClientHandlerDescriptor).TemplateDelegate, templateDelegate);
        }

        [Fact]
        public void Null_Complete_is_not_set()
        {
            GetJson().ContainsKey("complete").ShouldBeFalse();
        }

        [Fact]
        public void Error_HandlerName_sets_Error_HandlerName()
        {
            importSettings.Error.HandlerName = handler;

            Assert.Equal((GetJson()["error"] as ClientHandlerDescriptor).HandlerName, handler);
        }

        [Fact]
        public void Error_TemplateDelegate_sets_Error_TemplateDelegate()
        {
            importSettings.Error.TemplateDelegate = templateDelegate;

            Assert.Equal((GetJson()["error"] as ClientHandlerDescriptor).TemplateDelegate, templateDelegate);
        }

        [Fact]
        public void Null_Error_is_not_set()
        {
            GetJson().ContainsKey("error").ShouldBeFalse();
        }

        [Fact]
        public void Progress_HandlerName_sets_Progress_HandlerName()
        {
            importSettings.Progress.HandlerName = handler;

            Assert.Equal((GetJson()["progress"] as ClientHandlerDescriptor).HandlerName, handler);
        }

        [Fact]
        public void Progress_TemplateDelegate_sets_Progress_TemplateDelegate()
        {
            importSettings.Progress.TemplateDelegate = templateDelegate;

            Assert.Equal((GetJson()["progress"] as ClientHandlerDescriptor).TemplateDelegate, templateDelegate);
        }

        [Fact]
        public void Null_Progress_is_not_set()
        {
            GetJson().ContainsKey("progress").ShouldBeFalse();
        }

        [Fact]
        public void Select_HandlerName_sets_Select_HandlerName()
        {
            importSettings.Select.HandlerName = handler;

            Assert.Equal((GetJson()["select"] as ClientHandlerDescriptor).HandlerName, handler);
        }

        [Fact]
        public void Select_TemplateDelegate_sets_Select_TemplateDelegate()
        {
            importSettings.Select.TemplateDelegate = templateDelegate;

            Assert.Equal((GetJson()["select"] as ClientHandlerDescriptor).TemplateDelegate, templateDelegate);
        }

        [Fact]
        public void Null_Select_is_not_set()
        {
            GetJson().ContainsKey("select").ShouldBeFalse();
        }

        [Fact]
        public void Success_HandlerName_sets_Success_HandlerName()
        {
            importSettings.Success.HandlerName = handler;

            Assert.Equal((GetJson()["success"] as ClientHandlerDescriptor).HandlerName, handler);
        }

        [Fact]
        public void Success_TemplateDelegate_sets_Success_TemplateDelegate()
        {
            importSettings.Success.TemplateDelegate = templateDelegate;

            Assert.Equal((GetJson()["success"] as ClientHandlerDescriptor).TemplateDelegate, templateDelegate);
        }

        [Fact]
        public void Null_Success_is_not_set()
        {
            GetJson().ContainsKey("success").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return importSettings.ToJson();
        }
    }
}
