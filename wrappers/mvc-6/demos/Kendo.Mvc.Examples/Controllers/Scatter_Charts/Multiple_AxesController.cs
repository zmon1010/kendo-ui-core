using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Scatter_ChartsController : Controller
    {
        public IActionResult Multiple_Axes()
        {
            return View(ChartDataRepository.EngineData());
        }
    }
}