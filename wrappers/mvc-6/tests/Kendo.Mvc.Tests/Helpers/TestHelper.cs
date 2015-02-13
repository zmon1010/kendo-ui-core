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

namespace Kendo.Mvc.Tests
{
    public static class TestHelper
    {
        public static ViewContext CreateViewContext()
        {
            var activator = new Mock<IViewComponentActivator>();
            activator.Setup(a => a.Activate(It.IsAny<Object>(), It.IsAny<ViewContext>()))
                     .Callback((Object w, ViewContext v) => ((WidgetBase)w).HtmlHelper = Mock.Of<ITestableHtmlHelper>());

            var httpContext = new Mock<HttpContext>();
            httpContext.Setup(m => m.RequestServices.GetService(typeof(IViewComponentActivator)))
                   .Returns(activator.Object);

            var actionContext = new ActionContext(httpContext.Object, new RouteData(), new ActionDescriptor());
            var viewData = new ViewDataDictionary(new EmptyModelMetadataProvider(), new ModelStateDictionary());
            var viewContext = new ViewContext(actionContext, Mock.Of<IView>(), viewData, TextWriter.Null);

            return viewContext;
        }
    }
}