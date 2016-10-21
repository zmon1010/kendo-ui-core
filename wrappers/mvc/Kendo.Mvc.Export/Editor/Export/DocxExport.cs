using System;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Telerik.Windows.Documents.Flow.FormatProviders.Docx;
using Telerik.Windows.Documents.Flow.FormatProviders.Html;
using Telerik.Windows.Documents.Flow.FormatProviders.Rtf;
using Telerik.Windows.Documents.Flow.Model;

namespace Kendo.Mvc.Export
{
    public static partial class EditorExport
    {
        public static FileStreamResult ToDocxExportResult(string value, string fileName, HtmlImportSettings htmlImportSettings, DocxExportSettings docxExportSettings)
        {
            RadFlowDocument htmlDocument = GetHtmlFlowDocument(value, htmlImportSettings);
            var exportProvider = new DocxFormatProvider();
            exportProvider.ExportSettings = docxExportSettings;
            byte[] stream = exportProvider.Export(htmlDocument);

            return new FileStreamResult(new MemoryStream(stream), "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                FileDownloadName = String.Format("{0}.docx", fileName)
            };
        }

        public static FileStreamResult ToDocxExportResult(string value, string fileName, HtmlImportSettings htmlImportSettings)
        {
            return ToDocxExportResult(value, fileName, htmlImportSettings, new DocxExportSettings());
        }

        public static FileStreamResult ToDocxExportResult(string value, string fileName)
        {
            return ToDocxExportResult(value, fileName, new HtmlImportSettings(), new DocxExportSettings());
        }
    }
}
