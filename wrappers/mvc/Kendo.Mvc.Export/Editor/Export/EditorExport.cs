using System.IO;
using System.Web;
using System.Web.Mvc;
using Telerik.Windows.Documents.Flow.FormatProviders.Html;
using Telerik.Windows.Documents.Flow.Model;

namespace Kendo.Mvc.Export
{
    public static partial class EditorExport
    {

        /// <summary>
        /// Creates FileStreamResult based on the provided parameter, having a streem to be sent as response
        /// </summary>
        /// <param name="data">EditorExportData nesseary for all kinds of export</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult Export(EditorExportData data)
        {
            switch (data.ExportType)
            {
                case EditorExportType.Docx:
                    return ToDocxExportResult(data.Value, data.FileName, data.HtmlImportSettings, data.DocxExportSettings);
                case EditorExportType.Rtf:
                    return ToRtfExportResult(data.Value, data.FileName, data.HtmlImportSettings, data.RtfExportSettings);
                case EditorExportType.Pdf:
                    return ToPdfExportResult(data.Value, data.FileName, data.HtmlImportSettings, data.PdfExportSettings);
                case EditorExportType.Html:
                    return ToHtmlExportResult(data.Value, data.FileName, data.HtmlImportSettings, data.HtmlExportSettings);
                case EditorExportType.PlainText:
                    return ToTxtExportResult(data.Value, data.FileName, data.HtmlImportSettings);
            }
            return new FileStreamResult(new MemoryStream(), "txt/plain");
        }

        private static RadFlowDocument GetHtmlFlowDocument(string value, HtmlImportSettings htmlImportSettings)
        {
            string html = HttpUtility.HtmlDecode(value);
            var provider = new HtmlFormatProvider();
            provider.ImportSettings = htmlImportSettings;
            return provider.Import(html);
        }

    }
}
