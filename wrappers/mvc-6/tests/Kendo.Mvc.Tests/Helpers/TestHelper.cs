using System;
using System.IO;
using Kendo.Mvc.Rendering;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Routing;
using Moq;
using Microsoft.AspNet.Mvc.ViewComponents;
using Microsoft.AspNet.Http.Internal;
using Microsoft.AspNet.Mvc.Infrastructure;
using Microsoft.AspNet.Mvc.ViewFeatures;
using Microsoft.AspNet.Mvc.ViewEngines;
using Microsoft.AspNet.Mvc.Abstractions;

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
            var actionBindingContextAccessor = new Mock<IActionBindingContextAccessor>();
			var provider = new EmptyModelMetadataProvider();

			var serviceProvider = new Mock<IServiceProvider>();

            kendoHtmlGenerator.Setup(s => s.SanitizeId(It.IsAny<string>())).Returns((string s) => s);

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

			serviceProvider
				.Setup(s => s.GetService(typeof(IActionBindingContextAccessor)))
				.Returns(actionBindingContextAccessor.Object);

			httpContext.RequestServices = serviceProvider.Object;

			var actionContext = new ActionContext(httpContext, new RouteData(), new ActionDescriptor());
			var viewData = new ViewDataDictionary(provider, new ModelStateDictionary());
            var options = new HtmlHelperOptions();
            var viewContext = new ViewContext(
                actionContext,
                Mock.Of<IView>(),
                viewData,
                Mock.Of<ITempDataDictionary>(),
                new Mock<TextWriter>() { CallBase = true }.Object,
                options
            );

            return viewContext;
		}
	}
}