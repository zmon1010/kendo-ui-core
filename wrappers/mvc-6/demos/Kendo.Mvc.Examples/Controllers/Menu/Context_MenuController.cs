using Microsoft.AspNet.Mvc;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MenuController : Controller
    {
        public IActionResult Context_Menu()
        {
            return View();
        }

        public ActionResult _WebMailData([DataSourceRequest] DataSourceRequest request)
        {
            return Json(WebMailDataRepository.WebMailData().ToDataSourceResult(request));
        }
    }
}
