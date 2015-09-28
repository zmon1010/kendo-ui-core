using System.IO;
using System.Web;
using System.Web.Mvc;
using Telerik.Web.Spreadsheet;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class SpreadsheetController : Controller
    {
        public ActionResult Server_Side_Import_Export()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Upload(HttpPostedFileBase file)
        {
            var workbook = Workbook.Load(file.InputStream, Path.GetExtension(file.FileName));
            return Content(workbook.ToJson(), Telerik.Web.Spreadsheet.MimeTypes.JSON);
        }

        [HttpPost]
        public ActionResult Download(string data, string extension)
        {
            var workbook = Workbook.FromJson(data);
            using (var stream = new MemoryStream())
            {
                workbook.Save(stream, extension);

                var mimeType = Telerik.Web.Spreadsheet.MimeTypes.ByExtension[extension];
                return File(stream.ToArray(), mimeType, "Exported" + extension);
            }
        }
    }
}