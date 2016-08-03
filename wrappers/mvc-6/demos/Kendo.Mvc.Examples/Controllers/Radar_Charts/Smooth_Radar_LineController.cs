using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Radar_ChartsController : Controller
    {
        [Demo]
        public IActionResult Smooth_Radar_Line()
        {
            return View();
        }
    }
}