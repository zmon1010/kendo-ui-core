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

        public static FileStreamResult ToRtfExportResult(string value, string fileName, HtmlImportSettings htmlImportSettings)
        {
            return ToRtfExportResult(value, fileName, htmlImportSettings, new RtfExportSettings());
        }

        public static FileStreamResult ToRtfExportResult(string value, string fileName)
        {
            return ToRtfExportResult(value, fileName, new HtmlImportSettings(), new RtfExportSettings());
        }
    }
}
