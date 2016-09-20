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
        public FileStreamResult Export(string model, string data, string format, string title)
        {
            model = HttpUtility.UrlDecode(model);
            data = HttpUtility.UrlDecode(data);
            SpreadDocumentFormat exportFormat = format == "CSV" ? exportFormat = SpreadDocumentFormat.Csv : exportFormat = SpreadDocumentFormat.Xlsx;

            string fileName = String.Format("{0}.{1}", title, format);
            string mimeType = format == "CSV" ? "text/csv" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            Stream stream = Kendo.Mvc.Export.JsonToStream(exportFormat, data, model, title);

            var fileStreamResult = new FileStreamResult(stream, mimeType);
            fileStreamResult.FileDownloadName = fileName;
            fileStreamResult.FileStream.Seek(0, SeekOrigin.Begin);

            return fileStreamResult;
        }

        //public JsonResult Export(string model, string data, string format, string title)
        //{
        //    model = HttpUtility.UrlDecode(model);
        //    data = HttpUtility.UrlDecode(data);
        //    SpreadDocumentFormat exportFormat = format == "CSV" ? exportFormat = SpreadDocumentFormat.Csv : exportFormat = SpreadDocumentFormat.Xlsx;

        //    using (Stream stream = Kendo.Mvc.Export.JsonToStream(exportFormat, data, model, title))
        //    {
        //        Session[title] = (stream as MemoryStream).ToArray();
        //    }

        //    return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        //}

        //public FileResult Download(string title, string format)
        //{
        //    string mimeType = format == "CSV" ? "text/csv" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        //    if (Session[title] != null)
        //    {
        //        byte[] fileData = Session[title] as byte[];
        //        string fileName = string.Format("{0}.{1}", title, format.ToLowerInvariant());

        //        Session.Remove(title);

        //        Response.Buffer = true;
        //        Response.AddHeader("Content-Disposition", string.Format("attachment; filename={0}", fileName));
        //        return File(fileData, mimeType, fileName);
        //    }
        //    else
        //    {
        //        throw new Exception(string.Format("{0} not found", title));
        //    }
        //}
    }
}
