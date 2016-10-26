using System;
using System.Web;
using Telerik.Windows.Documents.Flow.FormatProviders.Rtf;
using Telerik.Windows.Documents.Flow.Model;

namespace Kendo.Mvc.Export
{
    public static partial class EditorImport
    {
        /// <summary>
        /// Exports the Rtf file into HTML
        /// </summary>
        /// <param name="file">Rtf file</param>
        /// <param name="settings">Import configuration settings</param>
        /// <returns>String</returns>
        public static String ToRtfImportResult(HttpPostedFileBase file, EditorImportSettings settings)
        {
            RtfFormatProvider formatProvider = new RtfFormatProvider();
            RadFlowDocument document = formatProvider.Import(file.InputStream);

            return GetHtmlFormatProvider(settings).Export(document);
        }
    }
}
