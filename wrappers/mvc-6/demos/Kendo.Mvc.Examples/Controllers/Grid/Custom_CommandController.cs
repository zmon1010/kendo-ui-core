using Kendo.Mvc.UI;
using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult Custom_Command()
        {
            return View();
        }

        public ActionResult CustomCommand_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetEmployees().ToDataSourceResult(request));
        }    
    }
}