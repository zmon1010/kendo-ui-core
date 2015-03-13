using Kendo.Mvc.Examples.Models;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Mvc;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public class HomeController : Controller
    {
        [Activate]
        protected IHostingEnvironment HostingEnvironment { get; set; }

        public IActionResult Index()
        {
            var widgets = NavigationProvider.SuiteWidgets(HostingEnvironment.WebRootFileProvider)
                                            .Where(widget => widget.ShouldInclude);

            ViewBag.Navigation = widgets;

            return View();
        }
    }
}