using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Bar_ChartsController : Controller
    {
        public IActionResult Pan_And_Zoom()
        {
            return View(ChartDataRepository.PanAndZoomData());
        }
    }
}
