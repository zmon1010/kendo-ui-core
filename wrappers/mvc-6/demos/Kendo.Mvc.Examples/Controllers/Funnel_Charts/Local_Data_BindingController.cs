using Kendo.Mvc.Examples.Models;
using Microsoft.AspNet.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Funnel_ChartsController : Controller
    {
        public IActionResult Local_Data_Binding()
        {
            ViewData["before"] = ChartDataRepository.BeforeOptimizationData();
            ViewData["after"] = ChartDataRepository.AfterOptimizationData();
            return View();
        }
    }
}