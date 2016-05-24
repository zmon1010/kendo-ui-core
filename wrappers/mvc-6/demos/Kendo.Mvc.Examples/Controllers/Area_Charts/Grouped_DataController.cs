using Microsoft.AspNetCore.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Area_ChartsController : Controller
    {
        public IActionResult Grouped_Data()
        {
            return View();
        }

        [HttpPost]
        public IActionResult _StockData()
        {
            return Json(ChartDataRepository.StockData());
        }
    }
}