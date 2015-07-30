using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Spreadsheet;

namespace Kendo.Controllers
{
    public class SpreadsheetController : Controller
    {
        [HttpPost]
        public ActionResult Upload(HttpPostedFileBase file)
        {            
            var workbook = Workbook.Load(file.InputStream, Path.GetExtension(file.FileName));
            return Content(workbook.ToJson(), Kendo.Spreadsheet.MimeTypes.JSON);
        }

        [HttpPost]
        public ActionResult Download(string data, string extension)
        {
            var workbook = Workbook.FromJson(data);
            using (var stream = new MemoryStream())
            {
                workbook.Save(stream, extension);

                var mimeType = Kendo.Spreadsheet.MimeTypes.ByExtension[extension];
                return File(stream.ToArray(), mimeType, "Exported" + extension);
            }
        }
    }
}
