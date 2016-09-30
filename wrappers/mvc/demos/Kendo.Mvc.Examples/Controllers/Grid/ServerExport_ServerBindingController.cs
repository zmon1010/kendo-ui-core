using Kendo.Mvc.Examples.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Web;
using System.Web.Mvc;
using Telerik.Documents.SpreadsheetStreaming;
using System.Collections;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        [Demo]
        public ActionResult Server_Export()
        {
            return View(productService.Read());
        }

        [HttpPost]
        public FileStreamResult ExportServer(string model, string data)
        {
            var columnsData = JsonConvert.DeserializeObject<IList<ExportColumnSettings>>(HttpUtility.UrlDecode(model));
            dynamic options = JsonConvert.DeserializeObject(HttpUtility.UrlDecode(data));
            SpreadDocumentFormat exportFormat = options.format.ToString() == "csv" ? exportFormat = SpreadDocumentFormat.Csv : exportFormat = SpreadDocumentFormat.Xlsx;
            Action<ExportCellStyle> action = new Action<ExportCellStyle>(ChangeCellStyle);

            string fileName = String.Format("{0}.{1}", options.title, options.format);
            string mimeType = Export.GetMimeType(exportFormat);

            Stream exportStream = (exportFormat == SpreadDocumentFormat.Xlsx) ? productService.Read().ToXlsxStream(columnsData, (string)options.title.ToString(), applyCellStyle: action)
                : productService.Read().ToCSVStream(columnsData, (string)options.title.ToString());

            var fileStreamResult = new FileStreamResult(exportStream, mimeType);
            fileStreamResult.FileDownloadName = fileName;
            fileStreamResult.FileStream.Seek(0, SeekOrigin.Begin);

            return fileStreamResult;
        }

        private void ChangeCellStyle(ExportCellStyle e)
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
