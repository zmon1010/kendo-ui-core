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
