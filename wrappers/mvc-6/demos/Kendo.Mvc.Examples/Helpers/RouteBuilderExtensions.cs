using Microsoft.AspNet.Routing;
using Microsoft.Framework.DependencyInjection;
using Microsoft.AspNet.Routing.Template;

namespace Kendo.Mvc.Examples
{
	public static class RouteBuilderExtensions {
		public static IRouteBuilder AddHyphenatedRoute(this IRouteBuilder routeBuilder)
		{
			var constraintResolver = routeBuilder.ServiceProvider.GetService<IInlineConstraintResolver>();

			routeBuilder.Routes.Add(new TemplateRoute(
				new HyphenatedRouteHandler(routeBuilder.DefaultHandler),
				"{controller}/{action}/{id?}",
				constraintResolver)
			);

			return routeBuilder;
        }
	}
}