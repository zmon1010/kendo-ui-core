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
        /// <param name="value">HTML content</param>
        /// <param name="fileName">The file name set to the FileStreamResult</param>
        /// <param name="htmlImportSettings">Optional settings set to the HtmlFormatProvider converting the value to RadFlowDocument</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult ToTxtExportResult(string value, string fileName, HtmlImportSettings htmlImportSettings)
        {

            RadFlowDocument htmlDocument = GetHtmlFlowDocument(value, htmlImportSettings);
            var exportProvider = new TxtFormatProvider();
            string output = exportProvider.Export(htmlDocument);
            return new FileStreamResult(new MemoryStream(Encoding.UTF8.GetBytes(output)), "text/plain")
            {
                FileDownloadName = String.Format("{0}.txt", fileName)
            };
        }

        public static FileStreamResult ToTxtExportResult(string value, string fileName)
        {
            return ToTxtExportResult(value, fileName, new HtmlImportSettings());
        }
    }
}
