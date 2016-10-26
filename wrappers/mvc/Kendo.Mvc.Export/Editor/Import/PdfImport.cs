using System;
using System.Web;
using Telerik.Windows.Documents.Flow.FormatProviders.Pdf;
using Telerik.Windows.Documents.Flow.Model;

namespace Kendo.Mvc.Export
{
    public static partial class EditorImport
    {
        /// <summary>
        /// Exports the Pdf file into HTML
        /// </summary>
        /// <param name="file">Pdf file</param>
        /// <param name="settings">Import configuration settings</param>
        /// <returns>String</returns>
        public static String ToPdfImportResult(HttpPostedFileBase file, EditorImportSettings settings)
        {
            PdfFormatProvider formatProvider = new PdfFormatProvider();
            RadFlowDocument document = formatProvider.Import(file.InputStream);

            return GetHtmlFormatProvider(settings).Export(document);
        }
    }
}
