using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Box_Plot_ChartsController : Controller
    {
        [Demo]
        public IActionResult Vertical()
        {
            return View();
        }
    }
}