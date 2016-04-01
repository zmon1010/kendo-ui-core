using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Filters;
using System.Globalization;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class SchedulerController
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!string.IsNullOrEmpty(context.HttpContext.Request.Query["culture"]))
            {
                CultureInfo.DefaultThreadCurrentCulture = CultureInfo.DefaultThreadCurrentUICulture = new CultureInfo(context.HttpContext.Request.Query["culture"]);
            }
            base.OnActionExecuting(context);
        }

        public IActionResult Globalization()
        {
            return View();
        }
    }
}
