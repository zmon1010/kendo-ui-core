using System;
using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class TreeMapController : Controller
    {
        public ActionResult Events()
        {
            return View();
        }

        public ActionResult _PopulationUSA()
        {
            return Json(TreeMapDataRepository.PopulationUSAData());
        }
    }
}