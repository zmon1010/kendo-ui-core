using System;
using System.IO;
using Kendo.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;
using Moq;
using Microsoft.AspNetCore.Mvc.ViewComponents;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Internal;
using Microsoft.AspNetCore.Routing;
using System.Text.Encodings.Web;

namespace Kendo.Mvc.Tests
{
	public static class TestHelper
	{
        // Passing only UrlGenerator at the moment for test purposes.
        // Should be refactored if more custom MockUps are required.
		public static ViewContext CreateViewContext(Mock<IUrlGenerator> customUrlGenerator = null)
		{
			var httpContext = new DefaultHttpContext();
			var urlHelper = new Mock<IUrlHelper>();
			var htmlHelper = new Mock<ITestableHtmlHelper>();
            var htmlEncoder = new Mock<HtmlEncoder>();
            var urlGenerator = customUrlGenerator != null ? customUrlGenerator : new Mock<IUrlGenerator>();
			var kendoHtmlGenerator = new Mock<IKendoHtmlGenerator>();
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
                .Setup(s => s.GetService(typeof(HtmlEncoder)))
                .Returns(htmlEncoder.Object);

            serviceProvider
				.Setup(s => s.GetService(typeof(IViewComponentActivator)))
				.Returns(new DefaultViewComponentActivator(new TypeActivatorCache()));

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