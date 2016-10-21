using System.IO;
using System.Web;
using System.Web.Mvc;
using Telerik.Windows.Documents.Flow.FormatProviders.Html;
using Telerik.Windows.Documents.Flow.Model;

namespace Kendo.Mvc.Export
{
    public static partial class EditorExport
    {
        public static FileStreamResult Export(EditorExportData data)
        {
            switch (data.ExportType)
            {
                case "docx":
                    return ToDocxExportResult(data.Value, data.FileName, data.HtmlImportSettings, data.DocxExportSettings);
                case "rtf":
                    return ToRtfExportResult(data.Value, data.FileName, data.HtmlImportSettings, data.RtfExportSettings);
                case "pdf":
                    return ToPdfExportResult(data.Value, data.FileName, data.HtmlImportSettings, data.PdfExportSettings);
                case "html":
                    return ToHtmlExportResult(data.Value, data.FileName, data.HtmlImportSettings, data.HtmlExportSettings);
                case "plainText":
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
