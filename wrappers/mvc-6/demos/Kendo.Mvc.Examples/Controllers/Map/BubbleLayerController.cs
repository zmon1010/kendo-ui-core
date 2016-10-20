using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MapController : BaseController
    {
        [Demo]
        public IActionResult Bubble_Layer()
        {
            return View();
        }

        [HttpPost]
        public ActionResult _UrbanAreas()
        {
            IEnumerable<UrbanArea> result;

            using (var db = GetContext())
            {
                result = db.UrbanAreas.ToList();
            }

            return Json(result);
        }
    }
}