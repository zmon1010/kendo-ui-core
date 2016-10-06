using System.IO;
using System;
using System.Collections.Generic;
using System.Collections;
using Telerik.Documents.SpreadsheetStreaming;

namespace Kendo.Mvc.Export
{
    public static class Helpers
    {
        internal const double DEFAULT_COLUMN_WIDTH = 8.43;

        private static object ExtractItemValue(object dataItem, string propertyName)
        {
            if (propertyName.Contains("."))
            {
                var temp = propertyName.Split(new char[] { '.' }, 2);
                return ExtractItemValue(ExtractItemValue(dataItem, temp[0]), temp[1]);
            }
            return dataItem.GetType().GetProperty(propertyName).GetValue(dataItem, null);
        }

        /// <summary>
        /// Returns a stream with exported data, based on the export format set in the method arguments.
        /// </summary>
        /// <param name="format">Export format; CSV or XLSX</param>
        /// <param name="data">Input data collection</param>
        /// <param name="model">Data model (columns)</param>
        /// <param name="title">Optional document title</param>
        /// <param name="columnStyleAction">Column style action; optional</param>
        /// <param name="rowStyleAction">Row style action; optional</param>
        /// <param name="cellStyleAction">Cell style action; optional</param>
        /// <returns>Export stream</returns>
        public static Stream CollectionToStream(SpreadDocumentFormat format, IEnumerable data, IList<ExportColumnSettings> model, string title = "Sheet",
             Action<ExportColumnStyle> columnStyleAction = null, Action<ExportRowStyle> rowStyleAction = null, Action<ExportCellStyle> cellStyleAction = null)
        {
            if (model == null || model.Count == 0)
            {
                throw new Exception("Data model should be provided");
            }
            if (data == null)
            {
                throw new Exception("Data should be provided");
            }

            if (string.IsNullOrEmpty(title))
            {
                throw new Exception("Title should be provided");
            }

            Dictionary<int, string> properties = new Dictionary<int, string>();
            for (int colIdx = 0; colIdx < model.Count; colIdx++)
            {
                properties[colIdx] = model[colIdx].Field;
            }

            MemoryStream stream = new MemoryStream();
            using (IWorkbookExporter workbook = SpreadExporter.CreateWorkbookExporter(format, stream))
            {
                using (IWorksheetExporter worksheet = workbook.CreateWorksheetExporter(title))
                {
                    for (int idx = 0; idx < model.Count; idx++)
                    {
                        var current = model[idx];
                        using (IColumnExporter column = worksheet.CreateColumnExporter())
                        {
                            if (current.Width.IsEmpty)
                            {
                                column.SetWidthInCharacters(DEFAULT_COLUMN_WIDTH);
                            }
                            else
                            {
                                column.SetWidthInPixels(current.Width.Value);
                            }

                            if (current.Hidden)
                            {
                                column.SetHidden(true);
                            }
                            columnStyleAction?.Invoke(new ExportColumnStyle(column, idx, current.Title ?? current.Field));
                        }
                    }
                    using (IRowExporter row = worksheet.CreateRowExporter())
                    {
                        rowStyleAction?.Invoke(new ExportRowStyle(row, 0));
                        for (int idx = 0; idx < model.Count; idx++)
                        {
                            var modelCol = model[idx];
                            string columnName = modelCol.Title ?? modelCol.Field;
                            using (ICellExporter cell = row.CreateCellExporter())
                            {
                                cell.SetValue(columnName);
                                cellStyleAction?.Invoke(new ExportCellStyle(cell, idx, 0));
                            }
                        }
                    }
                    int i = 1;
                    foreach (object item in data)
                    {
                        using (IRowExporter row = worksheet.CreateRowExporter())
                        {
                            rowStyleAction?.Invoke(new ExportRowStyle(row, i));
                            for (int colIdx = 0; colIdx < model.Count; colIdx++)
                            {
                                using (ICellExporter cell = row.CreateCellExporter())
                                {
                                    SetCellValue(cell, ExtractItemValue(item, properties[colIdx]));
                                    cellStyleAction?.Invoke(new ExportCellStyle(cell, colIdx, i));
                                }
                            }
                        }
                        i++;
                    }
                }
                return stream;
            }
        }

        private static void SetCellValue(ICellExporter cell, object value)
        {
            switch (Type.GetTypeCode(value.GetType()))
            {
                case TypeCode.Byte:
                case TypeCode.Char:
                case TypeCode.Decimal:
                case TypeCode.Double:
                case TypeCode.Int16:
                case TypeCode.Int32:
                case TypeCode.Int64:
                case TypeCode.SByte:
                case TypeCode.Single:
                case TypeCode.UInt16:
                case TypeCode.UInt32:
                case TypeCode.UInt64: cell.SetValue(Convert.ToDouble(value)); break;
                case TypeCode.DateTime: cell.SetValue((DateTime)value); break;
                case TypeCode.Boolean: cell.SetValue((bool)value); break;
                default: cell.SetValue(value.ToString()); break;
            }
        }

        /// <summary>
        /// Returns the MIME type for the corresponding export format.
        /// </summary>
        /// <param name="exportFormat">Export format type</param>
        /// <returns>MIME type string</returns>
        public static string GetMimeType(SpreadDocumentFormat exportFormat)
        {
            return exportFormat == SpreadDocumentFormat.Csv ? "text/csv" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        }
    }
}
