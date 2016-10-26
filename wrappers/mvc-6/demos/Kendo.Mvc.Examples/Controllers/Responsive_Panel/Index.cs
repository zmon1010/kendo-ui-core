using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Responsive_PanelController : Controller
    {
        [Demo]
        public IActionResult Index()
        {
            return View();
        }
    }
}