using System;
using System.IO;
using System.Web.Mvc;
using Telerik.Windows.Documents.Flow.FormatProviders.Html;
using Telerik.Windows.Documents.Flow.FormatProviders.Pdf.Export;
using Telerik.Windows.Documents.Flow.Model;

namespace Kendo.Mvc.Export
{
    public static partial class EditorExport
    {
        /// <summary>
        /// Creates FileStreamResult based on the provided parameters, having pdf streem to be sent as response
        /// </summary>
        /// <param name="data">Data containing the exported HTML content and the file name set to the FileStreamResult return value</param>
        /// <param name="htmlImportSettings">Optional settings set to the HtmlFormatProvider converting the value to RadFlowDocument</param>
        /// <param name="pdfEportSetting">Optional settings set to the PdfFormatProvider exporting a RadFlowDocument</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToPdfExportResult(EditorExportData data, HtmlImportSettings htmlImportSettings, PdfExportSettings pdfExportSettings)
        {
            RadFlowDocument htmlDocument = GetHtmlFlowDocument(data.Value, htmlImportSettings);
            var exportProvider = new Telerik.Windows.Documents.Flow.FormatProviders.Pdf.PdfFormatProvider();
            exportProvider.ExportSettings = pdfExportSettings;
            byte[] stream = exportProvider.Export(htmlDocument);

            return new FileStreamResult(new MemoryStream(stream), "application/pdf") {
                FileDownloadName = String.Format("{0}.pdf", data.FileName)
            };
        }

        /// <summary>
        /// Creates FileStreamResult based on the provided parameters, having pdf streem to be sent as response
        /// </summary>
        /// <param name="data">Data containing the exported HTML content and the file name set to the FileStreamResult return value</param>
        /// <param name="htmlImportSettings">Optional settings set to the HtmlFormatProvider converting the value to RadFlowDocument</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToPdfExportResult(EditorExportData data, HtmlImportSettings htmlImportSettings)
        {
            return ToPdfExportResult(data, htmlImportSettings, new PdfExportSettings());
        }

        /// <summary>
        /// Creates FileStreamResult based on the provided parameters, having pdf streem to be sent as response
        /// </summary>
        /// <param name="data">Data containing the exported HTML content and the file name set to the FileStreamResult return value</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToPdfExportResult(EditorExportData data)
        {
            return ToPdfExportResult(data, new HtmlImportSettings(), new PdfExportSettings());
        }
    }
}
