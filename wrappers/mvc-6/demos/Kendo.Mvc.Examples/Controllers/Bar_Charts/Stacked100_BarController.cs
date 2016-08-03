using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Bar_ChartsController : Controller
    {
        [Demo]
        public IActionResult Stacked100_Bar()
        {
            return View();
        }
    }
}