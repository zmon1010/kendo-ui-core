

namespace Kendo.Mvc
{
    using Kendo.Mvc.Extensions;
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using System.IO;
    using Telerik.Documents.SpreadsheetStreaming;

    public static class ExportExtensions
    {
        public static Stream ToXlsxStream(this IEnumerable instance, IList<ExportColumnSettings> model, string title, Action<ExportColumnStyle> applyColumnStyle = null, Action<ExportRowStyle> applyRowStyle = null, Action<ExportCellStyle> applyCellStyle = null)
        {
            return Export.CollectionToStream(SpreadDocumentFormat.Xlsx, instance, model, title, applyColumnStyle: applyColumnStyle, applyRowStyle: applyRowStyle, applyCellStyle: applyCellStyle);
        }

        public static Stream ToCSVStream(this IEnumerable instance, IList<ExportColumnSettings> model, string title)
        {
            return Export.CollectionToStream(SpreadDocumentFormat.Csv, instance, model, title);
        }
    }
}
