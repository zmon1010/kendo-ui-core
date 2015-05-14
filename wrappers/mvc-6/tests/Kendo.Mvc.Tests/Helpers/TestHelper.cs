using System;
using System.IO;
using Kendo.Mvc.Rendering;
using Microsoft.AspNet.Http.Core;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Routing;
using Moq;
using Microsoft.AspNet.Mvc.ViewComponents;

namespace Kendo.Mvc.Tests
{
	public class MockScopedInstance<T> : IScopedInstance<T>
	{
		public T Value { get; set; }

		public void Dispose()
		{
		}
	}

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

			serviceProvider
				.Setup(s => s.GetService(typeof(IScopedInstance<ActionBindingContext>)))
				.Returns(new MockScopedInstance<ActionBindingContext>());

			httpContext.RequestServices = serviceProvider.Object;

			var actionContext = new ActionContext(httpContext, new RouteData(), new ActionDescriptor());
			var viewData = new ViewDataDictionary(provider, new ModelStateDictionary());
            var viewContext = new ViewContext(actionContext, Mock.Of<IView>(), viewData, Mock.Of<ITempDataDictionary>(), new Mock<TextWriter>() { CallBase = true }.Object);

            return viewContext;
		}
	}
}