using Kendo.Mvc;

namespace Microsoft.Framework.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddKendo(this IServiceCollection services)
        {
            foreach (var service in KendoServices.GetServices())
            {
                services.Add(service);
            }

            return services;
        }
    }
}
