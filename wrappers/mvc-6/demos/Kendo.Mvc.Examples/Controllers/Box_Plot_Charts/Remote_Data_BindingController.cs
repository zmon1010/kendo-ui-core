using Microsoft.AspNet.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Box_Plot_ChartsController : Controller
    {
        public IActionResult Remote_Data_Binding()
        {
            return View();
        }

        [HttpPost]
        public IActionResult _OzoneConcentration()
        {
            return Json(ChartDataRepository.OzoneConcentrationRemote());
        }
    }
}