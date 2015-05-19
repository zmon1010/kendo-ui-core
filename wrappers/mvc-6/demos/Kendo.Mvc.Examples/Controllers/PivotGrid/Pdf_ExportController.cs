using Microsoft.AspNet.Mvc;
using System;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class PivotGridController : Controller
    {
        public ActionResult Pdf_Export()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Pdf_Export_Save(string contentType, string base64, string fileName)
        {
            var fileContents = Convert.FromBase64String(base64);

            return File(fileContents, contentType, fileName);
        }
    }
}
