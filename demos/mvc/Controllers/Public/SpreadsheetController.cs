using Kendo.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Telerik.Web.Spreadsheet;
using Telerik.Windows.Documents.Model;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders.Pdf;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders.Pdf.Export;
using Telerik.Windows.Documents.Spreadsheet.Model.Printing;
using Telerik.Windows.Documents.Spreadsheet.Utilities;

namespace Kendo.Controllers
{
    public class SpreadsheetController : Controller
    {
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

        [HttpPost]
        public ActionResult SaveAsPDF(string data, string activeSheet, PrintOptions options)
        {
            var workbook = Workbook.FromJson(data);
            var document = workbook.ToDocument();

            var provider = new PdfFormatProvider();
            provider.ExportSettings = new PdfExportSettings(options.Source, false);

            //document.ActiveSheet = document.Worksheets.First(sheet => sheet.Name == activeSheet);

            foreach (var sheet in document.Worksheets)
            {
                var pageSetup = sheet.WorksheetPageSetup;

                pageSetup.PaperType = options.PaperSize;
                pageSetup.PageOrientation = options.Orientation;

                pageSetup.CenterHorizontally = options.CenterHorizontally;
                pageSetup.CenterVertically = options.CenterVertically;

                pageSetup.PrintOptions.PrintGridlines = options.PrintGridlines;

                pageSetup.Margins = options.Margins;
            }

            using (var stream = new MemoryStream())
            {
                provider.Export(document, stream);

                var mimeType = Telerik.Web.Spreadsheet.MimeTypes.PDF;
                return File(stream.ToArray(), mimeType, "Print.pdf");
            }
        }
    }
}
