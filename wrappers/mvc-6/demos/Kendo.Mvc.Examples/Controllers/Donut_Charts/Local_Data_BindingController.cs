using Kendo.Mvc.Examples.Models;
using Microsoft.AspNet.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Donut_ChartsController : Controller
    {
        public IActionResult Local_Data_Binding()
        {
            return View(ChartDataRepository.SpainElectricityBreakdown());
        }
    }
}