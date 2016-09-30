

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
        public static Stream ToExportStream(this IEnumerable instance, SpreadDocumentFormat format, IList<ExportColumnSettings> model, string title, Action<ExportCellStyle> applyCellStyle)
        {
            return Export.CollectionToStream(format, instance, model, title, applyCellStyle);
        }

        public static Stream ToExportStream<T>(this IEnumerable<T> instance, SpreadDocumentFormat format, IList<ExportColumnSettings> model, string title, Action<ExportCellStyle> applyCellStyle)
        {
            return Export.CollectionToStream(format, instance, model, title, applyCellStyle);
        }
    }
}
