using System.IO;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Routing;
using Microsoft.Framework.WebEncoders;
using Microsoft.AspNet.Mvc.ViewFeatures;
using Microsoft.AspNet.Mvc.ViewEngines;
using Microsoft.AspNet.Mvc.Abstractions;

namespace Kendo.Mvc.Extensions
{
    public static class ViewContextExtensions
    {
		public static T GetService<T>(this ViewContext viewContext)
		{
			return viewContext.HttpContext.GetService<T>();
		}

		public static T GetService<T>(this HttpContext context)
		{
			return (T)context.RequestServices.GetService(typeof(T));
		}

		public static ViewContext ViewContextForType<T>(this ViewContext viewContext, IModelMetadataProvider metadataProvider)
		{
			var actionContext = new ActionContext(viewContext.HttpContext, new RouteData(), new ActionDescriptor());
			var viewDataDictionary = new ViewDataDictionary<T>(metadataProvider, new ModelStateDictionary());
            var tempDataDictionary = new TempDataDictionary(viewContext.GetService<IHttpContextAccessor>(), viewContext.GetService<ITempDataProvider>());
            var options = new HtmlHelperOptions
            {
                ClientValidationEnabled = viewContext.ClientValidationEnabled,
                Html5DateRenderingMode = viewContext.Html5DateRenderingMode,
                ValidationSummaryMessageElement = viewContext.ValidationSummaryMessageElement,
                ValidationMessageElement = viewContext.ValidationMessageElement
            };

            return new ViewContext(actionContext, viewContext.GetService<IView>(), viewDataDictionary, tempDataDictionary, new StringWriter(), options);
		}

		public static HtmlHelper<T> CreateHtmlHelper<T>(this ViewContext viewContext)
		{
			return new HtmlHelper<T>(
                viewContext.GetService<IHtmlGenerator>(),
                viewContext.GetService<ICompositeViewEngine>(),
                viewContext.GetService<IModelMetadataProvider>(),
                viewContext.GetService<IHtmlEncoder>(),
                viewContext.GetService<IUrlEncoder>(),
                viewContext.GetService<IJavaScriptStringEncoder>()
            );
		}
        public static string GetFullHtmlFieldName(this ViewContext viewContext, string name)
        {
            return viewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(name);
        }
    }
}