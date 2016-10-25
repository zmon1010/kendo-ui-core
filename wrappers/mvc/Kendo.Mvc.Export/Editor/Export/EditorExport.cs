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
        /// <param name="data">Data containing the content, the filename and the export type</param>
        /// <param name="settings">Optional settings providing configuration for all supported export types</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult Export(EditorExportData data, EditorDocumentsSettings settings)
        {
            switch (data.ExportType)
            {
                case EditorExportType.Docx:
                    return ToDocxExportResult(data, settings.HtmlImportSettings, settings.DocxExportSettings);
                case EditorExportType.Rtf:
                    return ToRtfExportResult(data, settings.HtmlImportSettings, settings.RtfExportSettings);
                case EditorExportType.Pdf:
                    return ToPdfExportResult(data, settings.HtmlImportSettings, settings.PdfExportSettings);
                case EditorExportType.Html:
                    return ToHtmlExportResult(data, settings.HtmlImportSettings, settings.HtmlExportSettings);
                case EditorExportType.PlainText:
                    return ToTxtExportResult(data, settings.HtmlImportSettings);
            }
            return new FileStreamResult(new MemoryStream(), "txt/plain");
        }

        /// <summary>
        /// Creates FileStreamResult based on the provided parameter, having a streem to be sent as response
        /// </summary>
        /// <param name="data">EditorExportData nesseary for all kinds of export</param>
        /// <returns>FileStreamResult</returns>
        public static FileStreamResult Export(EditorExportData data)
        {
            return Export(data, new EditorDocumentsSettings());
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
