namespace Kendo.Mvc.Infrastructure
{
    using Microsoft.AspNet.Http;
    using Microsoft.AspNet.Routing;

    public interface INavigationItemAuthorization
    {
        bool IsAccessibleToUser(HttpContext requestContext, INavigatable navigationItem);
    }
}