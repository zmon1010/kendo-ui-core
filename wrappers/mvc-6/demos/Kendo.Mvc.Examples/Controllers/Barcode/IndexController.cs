using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class BarcodeController : Controller
    {
        [Demo]
        public IActionResult Index()
        {
            return View();
        }
    }
}
