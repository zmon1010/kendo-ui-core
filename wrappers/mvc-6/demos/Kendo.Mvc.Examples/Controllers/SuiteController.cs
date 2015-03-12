using Kendo.Mvc.Examples.Models;
using Microsoft.AspNet.Mvc;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public class SuiteController : Controller
    {
        public IActionResult Index()
        {
            var widgets = NavigationProvider.SuiteWidgets().Where(widget => widget.ShouldInclude);

            ViewBag.Navigation = widgets;

            return View();
        }
    }
}
