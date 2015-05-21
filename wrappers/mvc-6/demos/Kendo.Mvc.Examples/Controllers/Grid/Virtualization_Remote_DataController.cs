using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNet.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
	public partial class GridController : Controller
    {
        public ActionResult Virtualization_Remote_Data()
        {
            return View();
        }

        public ActionResult Virtualization_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetOrders().ToDataSourceResult(request));
        }
    }
}