using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MapController : Controller
    {
        public IActionResult Geojson()
        {
            return View();
        }
    }
}