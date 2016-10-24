using System;
using System.IO;
using System.Web.Mvc;
using Telerik.Windows.Documents.Flow.FormatProviders.Docx;
using Telerik.Windows.Documents.Flow.FormatProviders.Html;
using Telerik.Windows.Documents.Flow.Model;

namespace Kendo.Mvc.Export
{
    public static partial class EditorExport
    {
        /// <summary>
        /// Creates FileStreamResult based on the provided parameters, having docx streem to be sent as response
        /// </summary>
        /// <param name="value">HTML content</param>
        /// <param name="fileName">The file name set to the FileStreamResult</param>
        /// <param name="htmlImportSettings">Optional settings set to the HtmlFormatProvider converting the value to RadFlowDocument</param>
        /// <param name="docxEportSetting">Optional settings set to the DocxFormatProvider exporting a RadFlowDocument</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToDocxExportResult(string value, string fileName, HtmlImportSettings htmlImportSettings, DocxExportSettings docxExportSettings)
        {
            RadFlowDocument htmlDocument = GetHtmlFlowDocument(value, htmlImportSettings);
            var exportProvider = new DocxFormatProvider();
            exportProvider.ExportSettings = docxExportSettings;
            byte[] stream = exportProvider.Export(htmlDocument);

            return new FileStreamResult(new MemoryStream(stream), "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                FileDownloadName = String.Format("{0}.docx", fileName)
            };
        }

        /// <summary>
        /// Creates FileStreamResult based on the provided parameters, having docx streem to be sent as response
        /// </summary>
        /// <param name="value">HTML content</param>
        /// <param name="fileName">The file name set to the FileStreamResult</param>
        /// <param name="htmlImportSettings">Optional settings set to the HtmlFormatProvider converting the value to RadFlowDocument</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToDocxExportResult(string value, string fileName, HtmlImportSettings htmlImportSettings)
        {
            return ToDocxExportResult(value, fileName, htmlImportSettings, new DocxExportSettings());
        }

        /// <summary>
        /// Creates FileStreamResult based on the provided parameters, having docx streem to be sent as response
        /// </summary>
        /// <param name="value">HTML content</param>
        /// <param name="fileName">The file name set to the FileStreamResult</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToDocxExportResult(string value, string fileName)
        {
            return ToDocxExportResult(value, fileName, new HtmlImportSettings(), new DocxExportSettings());
        }
    }
}
