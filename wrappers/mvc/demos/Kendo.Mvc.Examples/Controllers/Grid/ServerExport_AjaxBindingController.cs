using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.Mvc;
using Telerik.Documents.SpreadsheetStreaming;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        [Demo]
        public ActionResult Server_Export_Ajax()
        {
            return View();
        }

        [HttpPost]
        public FileStreamResult ExportAjax(string model, string data)
        {
            var columnsData = JsonConvert.DeserializeObject<IList<ExportColumnSettings>>(HttpUtility.UrlDecode(model));
            dynamic options = JsonConvert.DeserializeObject(HttpUtility.UrlDecode(data));
            SpreadDocumentFormat exportFormat = options.format.ToString() == "csv" ? exportFormat = SpreadDocumentFormat.Csv : exportFormat = SpreadDocumentFormat.Xlsx;
            Action<ExportCellStyle> action = ChangeCellStyle;

            string fileName = String.Format("{0}.{1}", options.title, options.format);
            string mimeType = Kendo.Mvc.Export.GetMimeType(exportFormat);

            Stream stream = Kendo.Mvc.Export.JsonToStream(exportFormat, options.data.ToString(), columnsData, options.title.ToString(), action);
            var fileStreamResult = new FileStreamResult(stream, mimeType);
            fileStreamResult.FileDownloadName = fileName;
            fileStreamResult.FileStream.Seek(0, SeekOrigin.Begin);

            return fileStreamResult;
        }

        public void ChangeCellStyleAjax(ExportCellStyle e)
        {
            SpreadCellFormat format = new SpreadCellFormat
            {
                ForeColor = e.Row == 0 ? SpreadThemableColor.FromRgb(143, 108, 54) : SpreadThemableColor.FromRgb(245, 24, 122),
                IsItalic = true,
                WrapText = true
            };
            e.Cell.SetFormat(format);
        }
    }
}
