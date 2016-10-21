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

        public static FileStreamResult ToHtmlExportResult(string value, string fileName, HtmlImportSettings htmlImportSettings)
        {
            return ToHtmlExportResult(value, fileName, htmlImportSettings, new HtmlExportSettings());
        }

        public static FileStreamResult ToHtmlExportResult(string value, string fileName)
        {
            return ToHtmlExportResult(value, fileName, new HtmlImportSettings(), new HtmlExportSettings());
        }
    }
}
