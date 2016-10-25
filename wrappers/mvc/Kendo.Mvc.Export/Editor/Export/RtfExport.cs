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
        /// <param name="data">Data containing the exported HTML content and the file name set to the FileStreamResult return value</param>
        /// <param name="htmlImportSettings">Optional settings set to the HtmlFormatProvider converting the value to RadFlowDocument</param>
        /// <param name="rtfEportSetting">Optional settings set to the RtfFormatProvider exporting a RadFlowDocument</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToRtfExportResult(EditorExportData data, HtmlImportSettings htmlImportSettings, RtfExportSettings rtfExportSettings)
        {

            RadFlowDocument htmlDocument = GetHtmlFlowDocument(data.Value, htmlImportSettings);
            var exportProvider = new RtfFormatProvider();
            exportProvider.ExportSettings = rtfExportSettings;
            string output = exportProvider.Export(htmlDocument);
            return new FileStreamResult(new MemoryStream(Encoding.UTF8.GetBytes(output)), "application/rtf")
            {
                FileDownloadName = String.Format("{0}.rtf", data.FileName)
            };
        }

        /// <summary>
        /// Creates FileStreamResult based on the provided parameters, having rtf streem to be sent as response
        /// </summary>
        /// <param name="data">Data containing the exported HTML content and the file name set to the FileStreamResult return value</param>
        /// <param name="htmlImportSettings">Optional settings set to the HtmlFormatProvider converting the value to RadFlowDocument</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToRtfExportResult(EditorExportData data, HtmlImportSettings htmlImportSettings)
        {
            return ToRtfExportResult(data, htmlImportSettings, new RtfExportSettings());
        }

        /// <summary>
        /// Creates FileStreamResult based on the provided parameters, having rtf streem to be sent as response
        /// </summary>
        /// <param name="data">Data containing the exported HTML content and the file name set to the FileStreamResult return value</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToRtfExportResult(EditorExportData data)
        {
            return ToRtfExportResult(data, new HtmlImportSettings(), new RtfExportSettings());
        }
    }
}
