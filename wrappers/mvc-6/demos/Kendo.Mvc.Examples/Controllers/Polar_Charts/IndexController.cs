using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Polar_ChartsController : Controller
    {
        [Demo]
        public IActionResult Index()
        {
            return View();
        }
    }
}