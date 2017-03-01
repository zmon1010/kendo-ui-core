using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace Kendo.Mvc.Examples.Controllers
{
    public abstract class BaseController : Controller
    {
        public BaseController()
        {
            CultureInfo.DefaultThreadCurrentCulture =
                CultureInfo.DefaultThreadCurrentUICulture =
                new CultureInfo("en-US");
        }
        public virtual SampleEntitiesDataContext GetContext()
        {
            return new SampleEntitiesDataContext();
        }
    }
}
