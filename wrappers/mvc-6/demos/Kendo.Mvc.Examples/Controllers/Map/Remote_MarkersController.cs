using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MapController : Controller
    {
        public ActionResult Remote_Markers()
        {
            return View();
        }

        [HttpPost]
        public ActionResult _StoreLocations()
        {
            return Json(MapDataRepository.StoreLocations());
        }
    }
}