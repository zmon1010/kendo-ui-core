using Kendo.Mvc.Rendering;
using Microsoft.Framework.ConfigurationModel;
using Microsoft.Framework.DependencyInjection;
using System.Collections.Generic;

namespace Kendo.Mvc
{
    public class KendoServices
    {
        public static IEnumerable<IServiceDescriptor> GetServices(IConfiguration configuration = null)
        {
            var describe = new ServiceDescriber(configuration);

            yield return describe.Transient<IKendoHtmlGenerator, KendoHtmlGenerator>();
            yield return describe.Transient<IUrlGenerator, UrlGenerator>();
        }
    }
}
