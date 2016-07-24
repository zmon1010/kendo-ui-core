using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Range_Bar_ChartsController : Controller
    {
        public IActionResult Remote_Data_Binding()
        {
            return View();
        }

        [HttpPost]
        public IActionResult _DownloadSpeeds()
        {
            return Json(ChartDataRepository.DownloadSpeeds());
        }
    }
}
