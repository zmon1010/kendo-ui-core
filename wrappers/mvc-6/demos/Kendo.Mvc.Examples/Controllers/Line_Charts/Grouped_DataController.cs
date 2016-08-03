using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Line_ChartsController : Controller
    {
        [Demo]
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