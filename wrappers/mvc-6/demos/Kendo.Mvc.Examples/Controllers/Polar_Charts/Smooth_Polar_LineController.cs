using Kendo.Mvc.Examples.Models;
using Microsoft.AspNet.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Polar_ChartsController : Controller
    {
        public IActionResult Smooth_Polar_Line()
        {
            return View(ChartDataRepository.SunPosition());
        }
    }
}