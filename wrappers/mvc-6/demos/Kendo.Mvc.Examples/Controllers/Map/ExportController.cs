using Microsoft.AspNetCore.Mvc;
using System;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MapController : BaseController
    {
        [Demo]
        public ActionResult Export()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Export_Save(string contentType, string base64, string fileName)
        {
            var fileContents = Convert.FromBase64String(base64);

            return File(fileContents, contentType, fileName);
        }
    }
}