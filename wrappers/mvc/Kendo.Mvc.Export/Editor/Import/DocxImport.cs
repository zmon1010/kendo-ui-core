using System;
using System.Web;
using Telerik.Windows.Documents.Flow.FormatProviders.Docx;
using Telerik.Windows.Documents.Flow.Model;

namespace Kendo.Mvc.Export
{
    public static partial class EditorImport
    {
        /// <summary>
        /// Exports the Docx file into HTML
        /// </summary>
        /// <param name="file">Docx file</param>
        /// <param name="settings">Import configuration settings</param>
        /// <returns>String</returns>
        public static String ToDocxImportResult(HttpPostedFileBase file, EditorImportSettings settings)
        {
            DocxFormatProvider formatProvider = new DocxFormatProvider();
            RadFlowDocument document = formatProvider.Import(file.InputStream);

            return GetHtmlFormatProvider(settings).Export(document);
        }
    }
}
