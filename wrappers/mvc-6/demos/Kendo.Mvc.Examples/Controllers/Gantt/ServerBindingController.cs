using Kendo.Mvc.Examples.Models.Gantt;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNet.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GanttController : Controller
    {
        public ActionResult ServerBinding()
        {
            ViewBag.Tasks = taskService.GetAll();
            ViewBag.Dependencies = dependencyService.GetAll();

            return View();
        }
    }
}