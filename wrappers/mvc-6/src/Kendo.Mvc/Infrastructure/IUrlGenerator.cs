namespace Kendo.Mvc
{    
    using Microsoft.AspNet.Mvc;
    using Microsoft.AspNet.Routing;

    public interface IUrlGenerator
    {
        string Generate(ActionContext context, INavigatable navigationItem);
        string Generate(ActionContext context, INavigatable navigationItem, RouteValueDictionary routeValues);
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1054:UriParametersShouldNotBeStrings", MessageId = "1#", Justification = "Should accept url as string.")]
        string Generate(ActionContext context, string url);
    }
}