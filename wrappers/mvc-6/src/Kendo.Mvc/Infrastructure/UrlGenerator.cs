namespace Kendo.Mvc
{
    using System;
    using System.Linq;
    using Kendo.Mvc.Extensions;
    using Microsoft.AspNet.Mvc;
    using Microsoft.AspNet.Routing;
    using Microsoft.Framework.DependencyInjection;

    public class UrlGenerator : IUrlGenerator
    {
        public string Generate(ActionContext context, string url)
        {
            return GetUrlHelper(context).Content(url);
        }

        private IUrlHelper GetUrlHelper(ActionContext context)
        {
            return context.HttpContext.RequestServices.GetRequiredService<IUrlHelper>();
        }

        public string Generate(ActionContext context, INavigatable navigationItem, RouteValueDictionary routeValues)
        {            
            var urlHelper = GetUrlHelper(context);
            string generatedUrl = null;

            if (!string.IsNullOrEmpty(navigationItem.RouteName))
            {
                generatedUrl = urlHelper.RouteUrl(navigationItem.RouteName, routeValues);
            }
            else if (!string.IsNullOrEmpty(navigationItem.ControllerName) && !string.IsNullOrEmpty(navigationItem.ActionName))
            {
                generatedUrl = urlHelper.Action(navigationItem.ActionName, navigationItem.ControllerName, routeValues, null, null);
            }
            else if (!string.IsNullOrEmpty(navigationItem.Url))
            {
                generatedUrl = navigationItem.Url.StartsWith("~/", StringComparison.Ordinal) ?
                               urlHelper.Content(navigationItem.Url) :
                               navigationItem.Url;
            }
            else if (routeValues.Any())
            {
                generatedUrl = urlHelper.RouteUrl(routeValues);
            }

            return generatedUrl;

        }
        public string Generate(ActionContext context, INavigatable navigationItem)
        {
            var routeValues = new RouteValueDictionary();

            if (navigationItem.RouteValues.Any())
            {
                routeValues.Merge(navigationItem.RouteValues);
            }

            return Generate(context, navigationItem, routeValues);
        }
    }
}