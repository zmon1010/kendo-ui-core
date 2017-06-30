using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Telerik.Windows.Documents.Fixed.FormatProviders.Pdf;
using Telerik.Windows.Documents.Fixed.FormatProviders.Pdf.Export;
using Telerik.Windows.Documents.Fixed.Model;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class PdfProcessingController : Controller
    {
        [Demo]
        public ActionResult Bar_Chart_Export()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Download_Chart_Document(bool cb1, bool cb2, bool cb3, bool cb4, string products, double currency)
        {
            PdfFormatProvider formatProvider = new PdfFormatProvider();
            formatProvider.ExportSettings.ImageQuality = ImageQuality.High;

            byte[] renderedBytes = null;
            using (MemoryStream ms = new MemoryStream())
            {
                RadFixedDocument document = CreatePdfWithBarChart.CreateDocument(cb1, cb2, cb3, cb4, products, currency);
                formatProvider.Export(document, ms);
                renderedBytes = ms.ToArray();
            }

            return File(renderedBytes, "application/pdf", "PdfDocument.pdf");
        }
    }
}