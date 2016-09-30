using Newtonsoft.Json;
using System.IO;
using Telerik.Documents.SpreadsheetStreaming;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Collections;
using System.Data;

namespace Kendo.Mvc
{
    public static class Export
    {
        private static object ExtractItemValue(object dataItem, string propertyName)
        {
            if (propertyName.Contains("."))
            {
                var temp = propertyName.Split(new char[] { '.' }, 2);
                return ExtractItemValue(ExtractItemValue(dataItem, temp[0]), temp[1]);
            }
            return dataItem.GetType().GetProperty(propertyName).GetValue(dataItem, null);
        }

        public static Stream CollectionToStream(SpreadDocumentFormat format, IEnumerable data, IList<ExportColumnSettings> model, string title, 
            Action<ExportCellStyle> applyCellStyle = null, Action<ExportColumnStyle> applyColumnStyle = null, Action<ExportRowStyle> applyRowStyle = null)
        {
            if (model == null || model.Count == 0)
            {
                throw new Exception("Data model should be provided");
            }
            if (data == null)
            {
                throw new Exception("Data should be provided");
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
                        using (IColumnExporter column = worksheet.CreateColumnExporter())
                        {
                            column.SetWidthInPixels(100);
                            if (model[idx].Hidden)
                            {
                                column.SetHidden(true);
                            }
                            applyColumnStyle?.Invoke(new ExportColumnStyle(column, idx));
                        }
                    }
                    using (IRowExporter row = worksheet.CreateRowExporter())
                    {
                        for (int idx = 0; idx < model.Count; idx++)
                        {
                            var modelCol = model[idx];
                            string columnName = modelCol.Title ?? modelCol.Field;
                            using (ICellExporter cell = row.CreateCellExporter())
                            {
                                cell.SetValue(columnName);
                                applyCellStyle?.Invoke(new ExportCellStyle(cell, idx, 0));
                            }
                        }
                    }
                    int i = 0;
                    foreach (object item in data)
                    {
                        using (IRowExporter row = worksheet.CreateRowExporter())
                        {
                            applyRowStyle?.Invoke(new ExportRowStyle(row, i));
                            for (int colIdx = 0; colIdx < model.Count; colIdx++)
                            {
                                using (ICellExporter cell = row.CreateCellExporter())
                                {
                                    cell.SetValue(ExtractItemValue(item, properties[colIdx]).ToString());
                                    applyCellStyle?.Invoke(new ExportCellStyle(cell, colIdx, i + 1));
                                }
                            }
                        }
                        i++;
                    }
                }
                return stream;
            }
        }

        public static string GetMimeType(SpreadDocumentFormat exportFormat)
        {
            return exportFormat == SpreadDocumentFormat.Csv ? "text/csv" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        }
    }
}
