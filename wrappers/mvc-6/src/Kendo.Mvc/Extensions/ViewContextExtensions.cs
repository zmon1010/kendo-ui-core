using System.IO;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Routing;

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
			return new ViewContext(actionContext, viewContext.GetService<IView>(), viewDataDictionary, new StringWriter());			
		}

		public static HtmlHelper<T> CreateHtmlHelper<T>(this ViewContext viewContext)
		{
			var generator = viewContext.GetService<IHtmlGenerator>();
			var viewEngine = viewContext.GetService<ICompositeViewEngine>();
			var modelMetadataProvider = viewContext.GetService<IModelMetadataProvider>();

			return new HtmlHelper<T>(generator, viewEngine, modelMetadataProvider);
		}
        public static string GetFullHtmlFieldName(this ViewContext viewContext, string name)
        {
            return viewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(name);
        }
    }
}