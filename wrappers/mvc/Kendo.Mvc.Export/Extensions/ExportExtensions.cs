namespace Kendo.Mvc.Export
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.IO;
    using Telerik.Documents.SpreadsheetStreaming;

    public static class ExportExtensions
    {
        /// <summary>
        /// Creates an Xlsx stream based on the provided parameters
        /// </summary>
        /// <param name="instance">IEnumerable instance</param>
        /// <param name="model">Data model</param>
        /// <param name="title">Optional document title</param>
        /// <param name="columnStyleAction">Optional column style action</param>
        /// <param name="rowStyleAction">Optional row style action</param>
        /// <param name="cellStyleAction">Optional cell style action</param>
        /// <returns>Xlsx stream</returns>        
        public static Stream ToXlsxStream(this IEnumerable instance, IList<ExportColumnSettings> model, string title = "Sheet", Action<ExportColumnStyle> columnStyleAction = null, Action<ExportRowStyle> rowStyleAction = null, Action<ExportCellStyle> cellStyleAction = null)
        {
            return Helpers.CollectionToStream(SpreadDocumentFormat.Xlsx, instance, model, title, columnStyleAction: columnStyleAction, rowStyleAction: rowStyleAction, cellStyleAction: cellStyleAction);
        }

        /// <summary>
        /// Creates a CSv stream based on the provided parameters
        /// </summary>
        /// <param name="instance">IEnumerable instance</param>
        /// <param name="model">Data model</param>
        /// <returns>Csv stream</returns>
        public static Stream ToCsvStream(this IEnumerable instance, IList<ExportColumnSettings> model)
        {
            return Helpers.CollectionToStream(SpreadDocumentFormat.Csv, instance, model);
        }
    }
}
