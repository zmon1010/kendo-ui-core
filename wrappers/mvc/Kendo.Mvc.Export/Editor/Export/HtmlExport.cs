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
        /// <param name="data">Data containing the exported HTML content and the file name set to the FileStreamResult return value</param>
        /// <param name="htmlImportSettings">Optional settings set to the HtmlFormatProvider converting the value to RadFlowDocument</param>
        /// <param name="htmlEportSetting">Optional settings set to the HtmlFormatProvider exporting a RadFlowDocument</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToHtmlExportResult(EditorExportData data, HtmlImportSettings htmlImportSettings, HtmlExportSettings htmlExportSettings)
        {

            RadFlowDocument htmlDocument = GetHtmlFlowDocument(data.Value, htmlImportSettings);
            var exportProvider = new HtmlFormatProvider();
            exportProvider.ExportSettings = htmlExportSettings;
            string output = exportProvider.Export(htmlDocument);
            return new FileStreamResult(new MemoryStream(Encoding.UTF8.GetBytes(output)), "text/html")
            {
                FileDownloadName = String.Format("{0}.html", data.FileName)
            };
        }

        /// <summary>
        /// Creates FileStreamResult based on the provided parameters, having html streem to be sent as response
        /// </summary>
        /// <param name="data">Data containing the exported HTML content and the file name set to the FileStreamResult return value</param>
        /// <param name="htmlImportSettings">Optional settings set to the HtmlFormatProvider converting the value to RadFlowDocument</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToHtmlExportResult(EditorExportData data, HtmlImportSettings htmlImportSettings)
        {
            return ToHtmlExportResult(data, htmlImportSettings, new HtmlExportSettings());
        }

        /// <summary>
        /// Creates FileStreamResult based on the provided parameters, having html streem to be sent as response
        /// </summary>
        /// <param name="data">Data containing the exported HTML content and the file name set to the FileStreamResult return value</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToHtmlExportResult(EditorExportData data)
        {
            return ToHtmlExportResult(data, new HtmlImportSettings(), new HtmlExportSettings());
        }
    }
}
