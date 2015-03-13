using Kendo.Mvc;
using Microsoft.Framework.ConfigurationModel;

namespace Microsoft.Framework.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddKendo(this IServiceCollection services, IConfiguration configuration = null)
        {
            services.TryAdd(KendoServices.GetServices(configuration));

            return services;
        }
    }
}
