using Kendo.Mvc.Examples.Models;
using Microsoft.AspNet.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Radar_ChartsController : Controller
    {
        public IActionResult Remote_Data_Binding()
        {
            return View();
        }

        [HttpPost]
        public IActionResult _BudgetReport()
        {
            return Json(ChartDataRepository.BudgetReport());
        }
    }
}