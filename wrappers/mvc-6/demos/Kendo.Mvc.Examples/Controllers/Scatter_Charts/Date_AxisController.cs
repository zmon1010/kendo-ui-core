using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Scatter_ChartsController : Controller
    {
        public IActionResult Date_Axis()
        {
            return View();
        }

        [HttpPost]
        public ActionResult _StockData()
        {
            return Json(ChartDataRepository.StockData());
        }
    }
}