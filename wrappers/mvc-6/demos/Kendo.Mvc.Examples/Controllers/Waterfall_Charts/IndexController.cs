using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Waterfall_ChartsController : Controller
    {
        [Demo]
        public IActionResult Index()
        {
            return View();
        }
    }
}