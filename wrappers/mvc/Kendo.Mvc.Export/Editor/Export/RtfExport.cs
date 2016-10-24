using System;
using System.IO;
using System.Text;
using System.Web.Mvc;
using Telerik.Windows.Documents.Flow.FormatProviders.Html;
using Telerik.Windows.Documents.Flow.FormatProviders.Rtf;
using Telerik.Windows.Documents.Flow.Model;

namespace Kendo.Mvc.Export
{
    public static partial class EditorExport
    {
        /// <summary>
        /// Creates FileStreamResult based on the provided parameters, having rtf streem to be sent as response
        /// </summary>
        /// <param name="value">HTML content</param>
        /// <param name="fileName">The file name set to the FileStreamResult</param>
        /// <param name="htmlImportSettings">Optional settings set to the HtmlFormatProvider converting the value to RadFlowDocument</param>
        /// <param name="rtfEportSetting">Optional settings set to the RtfFormatProvider exporting a RadFlowDocument</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToRtfExportResult(string value, string fileName, HtmlImportSettings htmlImportSettings, RtfExportSettings rtfExportSettings)
        {

            RadFlowDocument htmlDocument = GetHtmlFlowDocument(value, htmlImportSettings);
            var exportProvider = new RtfFormatProvider();
            exportProvider.ExportSettings = rtfExportSettings;
            string output = exportProvider.Export(htmlDocument);
            return new FileStreamResult(new MemoryStream(Encoding.UTF8.GetBytes(output)), "application/rtf")
            {
                FileDownloadName = String.Format("{0}.rtf", fileName)
            };
        }

        /// <summary>
        /// Creates FileStreamResult based on the provided parameters, having rtf streem to be sent as response
        /// </summary>
        /// <param name="value">HTML content</param>
        /// <param name="fileName">The file name set to the FileStreamResult</param>
        /// <param name="htmlImportSettings">Optional settings set to the HtmlFormatProvider converting the value to RadFlowDocument</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToRtfExportResult(string value, string fileName, HtmlImportSettings htmlImportSettings)
        {
            return ToRtfExportResult(value, fileName, htmlImportSettings, new RtfExportSettings());
        }

        /// <summary>
        /// Creates FileStreamResult based on the provided parameters, having rtf streem to be sent as response
        /// </summary>
        /// <param name="value">HTML content</param>
        /// <param name="fileName">The file name set to the FileStreamResult</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToRtfExportResult(string value, string fileName)
        {
            return ToRtfExportResult(value, fileName, new HtmlImportSettings(), new RtfExportSettings());
        }
    }
}
