using System;
using System.IO;
using System.Text;
using System.Web.Mvc;
using Telerik.Windows.Documents.Flow.FormatProviders.Html;
using Telerik.Windows.Documents.Flow.Model;

namespace Kendo.Mvc.Export
{
    public static partial class EditorExport
    {
        /// <summary>
        /// Creates FileStreamResult based on the provided parameters, having html streem to be sent as response
        /// </summary>
        /// <param name="value">HTML content</param>
        /// <param name="fileName">The file name set to the FileStreamResult</param>
        /// <param name="htmlImportSettings">Optional settings set to the HtmlFormatProvider converting the value to RadFlowDocument</param>
        /// <param name="htmlEportSetting">Optional settings set to the HtmlFormatProvider exporting a RadFlowDocument</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToHtmlExportResult(string value, string fileName, HtmlImportSettings htmlImportSettings, HtmlExportSettings htmlExportSettings)
        {

            RadFlowDocument htmlDocument = GetHtmlFlowDocument(value, htmlImportSettings);
            var exportProvider = new HtmlFormatProvider();
            exportProvider.ExportSettings = htmlExportSettings;
            string output = exportProvider.Export(htmlDocument);
            return new FileStreamResult(new MemoryStream(Encoding.UTF8.GetBytes(output)), "text/html")
            {
                FileDownloadName = String.Format("{0}.html", fileName)
            };
        }

        /// <summary>
        /// Creates FileStreamResult based on the provided parameters, having html streem to be sent as response
        /// </summary>
        /// <param name="value">HTML content</param>
        /// <param name="fileName">The file name set to the FileStreamResult</param>
        /// <param name="htmlImportSettings">Optional settings set to the HtmlFormatProvider converting the value to RadFlowDocument</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToHtmlExportResult(string value, string fileName, HtmlImportSettings htmlImportSettings)
        {
            return ToHtmlExportResult(value, fileName, htmlImportSettings, new HtmlExportSettings());
        }

        /// <summary>
        /// Creates FileStreamResult based on the provided parameters, having html streem to be sent as response
        /// </summary>
        /// <param name="value">HTML content</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToHtmlExportResult(string value, string fileName)
        {
            return ToHtmlExportResult(value, fileName, new HtmlImportSettings(), new HtmlExportSettings());
        }
    }
}
