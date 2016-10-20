using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public abstract class BaseController : Controller
    {
        public virtual SampleEntitiesDataContext GetContext()
        {
            return new SampleEntitiesDataContext();
        }
    }
}
