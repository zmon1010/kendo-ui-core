using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Scatter_ChartsController : Controller
    {
        public ActionResult Remote_Data_Binding()
        {
            return View();
        }

        [HttpPost]
        public IActionResult _PricePerformanceData()
        {
            return Json(ChartDataRepository.PricePerformanceData());
        }
    }
}