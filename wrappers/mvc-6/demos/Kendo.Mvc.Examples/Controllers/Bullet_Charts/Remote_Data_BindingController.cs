using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Bullet_ChartsController : Controller
    {
        public IActionResult Remote_Data_Binding()
        {
            return View();
        }

        [HttpPost]
        public ActionResult _AprilSales()
        {
            return Json(ChartDataRepository.AprilSalesData());
        }
    }
}