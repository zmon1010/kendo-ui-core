using Kendo.Mvc;

namespace Microsoft.Framework.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddKendo(this IServiceCollection services)
        {
            services.TryAdd(KendoServices.GetServices());

            return services;
        }
    }
}
