using Microsoft.AspNet.Mvc.ModelBinding;
using Microsoft.AspNet.PipelineCore;
using Microsoft.AspNet.Routing;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using Moq;
using System;
using System.IO;
using Xunit;
using Microsoft.AspNet.Http;
using Kendo.Mvc.UI;
using Kendo.Mvc.Rendering;

namespace Kendo.Mvc.Tests
{
    public static class TestHelper
    {
        public static ViewContext CreateViewContext()
        {
            var httpContext = new DefaultHttpContext();
            var urlHelper = new Mock<IUrlHelper>();
            var htmlHelper = new Mock<ITestableHtmlHelper>();
            var urlGenerator = new Mock<IUrlGenerator>();
            var kendoHtmlGenerator = new Mock<IKendoHtmlGenerator>();
            var provider = new EmptyModelMetadataProvider();

            var serviceProvider = new Mock<IServiceProvider>();
            serviceProvider
                .Setup(s => s.GetService(typeof(IModelMetadataProvider)))
                .Returns(provider);

            serviceProvider
                .Setup(s => s.GetService(typeof(IUrlHelper)))
                .Returns(urlHelper.Object);

            serviceProvider
                .Setup(s => s.GetService(typeof(IUrlGenerator)))
                .Returns(urlGenerator.Object);

            serviceProvider
                .Setup(s => s.GetService(typeof(IHtmlHelper)))
                .Returns(htmlHelper.Object);

            serviceProvider
                .Setup(s => s.GetService(typeof(IKendoHtmlGenerator)))
                .Returns(kendoHtmlGenerator.Object);

            serviceProvider
                .Setup(s => s.GetService(typeof(IViewComponentActivator)))
                .Returns(new DefaultViewComponentActivator());

            httpContext.RequestServices = serviceProvider.Object;

            var actionContext = new ActionContext(httpContext, new RouteData(), new ActionDescriptor());
            var viewData = new ViewDataDictionary(provider, new ModelStateDictionary());
            var viewContext = new ViewContext(actionContext, Mock.Of<IView>(), viewData, TextWriter.Null);
            
            return viewContext;
        }
    }
}