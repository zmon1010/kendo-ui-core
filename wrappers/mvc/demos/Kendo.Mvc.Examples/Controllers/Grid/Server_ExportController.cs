using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Telerik.Documents.SpreadsheetStreaming;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        [Demo]
        public ActionResult Server_Export()
        {
            return View();
        }

        [HttpPost]
        public FileStreamResult Export(string data)
        {
            data = HttpUtility.UrlDecode(data);
            dynamic options = JsonConvert.DeserializeObject(data);
            SpreadDocumentFormat exportFormat = options.format.ToString() == "csv" ? exportFormat = SpreadDocumentFormat.Csv : exportFormat = SpreadDocumentFormat.Xlsx;

            string fileName = String.Format("{0}.{1}", options.title, options.format);
            string mimeType = Kendo.Mvc.Export.GetMimeType(exportFormat);

            Stream stream = Kendo.Mvc.Export.JsonToStream(exportFormat, options.data.ToString(), options.model.ToString(), options.title.ToString());

            var fileStreamResult = new FileStreamResult(stream, mimeType);
            fileStreamResult.FileDownloadName = fileName;
            fileStreamResult.FileStream.Seek(0, SeekOrigin.Begin);

            return fileStreamResult;
        }
    }
}
