using System;
using System.IO;
using System.Text;
using System.Web.Mvc;
using Telerik.Windows.Documents.Flow.FormatProviders.Html;
using Telerik.Windows.Documents.Flow.FormatProviders.Txt;
using Telerik.Windows.Documents.Flow.Model;

namespace Kendo.Mvc.Export
{
    public static partial class EditorExport
    {
        /// <summary>
        /// Creates FileStreamResult based on the provided parameters, having txt streem to be sent as response
        /// </summary>
        /// <param name="data">Data containing the exported HTML content and the file name set to the FileStreamResult return value</param>
        /// <param name="htmlImportSettings">Optional settings set to the HtmlFormatProvider converting the value to RadFlowDocument</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToTxtExportResult(EditorExportData data, HtmlImportSettings htmlImportSettings)
        {

            RadFlowDocument htmlDocument = GetHtmlFlowDocument(data.Value, htmlImportSettings);
            var exportProvider = new TxtFormatProvider();
            string output = exportProvider.Export(htmlDocument);
            return new FileStreamResult(new MemoryStream(Encoding.UTF8.GetBytes(output)), "text/plain")
            {
                FileDownloadName = String.Format("{0}.txt", data.FileName)
            };
        }

        /// <summary>
        /// Creates FileStreamResult based on the provided parameters, having txt streem to be sent as response
        /// </summary>
        /// <param name="data">Data containing the exported HTML content and the file name set to the FileStreamResult return value</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToTxtExportResult(EditorExportData data)
        {
            return ToTxtExportResult(data, new HtmlImportSettings());
        }
    }
}
