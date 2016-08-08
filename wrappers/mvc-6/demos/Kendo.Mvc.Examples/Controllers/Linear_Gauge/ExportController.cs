using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Linear_GaugeController : Controller
    {
        [Demo]
        public IActionResult Export()
        {
            return View();
        }
    }
}
