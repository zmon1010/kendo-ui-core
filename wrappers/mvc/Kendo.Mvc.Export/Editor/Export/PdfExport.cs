using System;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Telerik.Windows.Documents.Flow.FormatProviders.Docx;
using Telerik.Windows.Documents.Flow.FormatProviders.Html;
using Telerik.Windows.Documents.Flow.FormatProviders.Pdf.Export;
using Telerik.Windows.Documents.Flow.FormatProviders.Rtf;
using Telerik.Windows.Documents.Flow.Model;

namespace Kendo.Mvc.Export
{
    public static partial class EditorExport
    {
        public static FileStreamResult ToPdfExportResult(string value, string fileName, HtmlImportSettings htmlImportSettings, PdfExportSettings pdfExportSettings)
        {
            RadFlowDocument htmlDocument = GetHtmlFlowDocument(value, htmlImportSettings);
            var exportProvider = new Telerik.Windows.Documents.Flow.FormatProviders.Pdf.PdfFormatProvider();
            exportProvider.ExportSettings = pdfExportSettings;
            byte[] stream = exportProvider.Export(htmlDocument);

            return new FileStreamResult(new MemoryStream(stream), "application/pdf") {
                FileDownloadName = String.Format("{0}.pdf", fileName)
            };
        }

        public static FileStreamResult ToPdfExportResult(string value, string fileName, HtmlImportSettings htmlImportSettings)
        {
            return ToPdfExportResult(value, fileName, htmlImportSettings, new PdfExportSettings());
        }

        public static FileStreamResult ToPdfExportResult(string value, string fileName)
        {
            return ToPdfExportResult(value, fileName, new HtmlImportSettings(), new PdfExportSettings());
        }
    }
}
