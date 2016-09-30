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

        public static Stream JsonToStream(SpreadDocumentFormat format, string data, IList<ExportColumnSettings> model, string title, Action<ExportCellStyle> applyCellStyle)
        {
            if (model == null || model.Count == 0)
            {
                throw new Exception("Data model should be provided");
            }
            if (string.IsNullOrEmpty(data))
            {
                throw new Exception("Data should be provided");
            }
            var dataObject = JsonConvert.DeserializeObject<dynamic>(data);

            MemoryStream stream = new MemoryStream();
            using (IWorkbookExporter workbook = SpreadExporter.CreateWorkbookExporter(format, stream))
            {
                using (IWorksheetExporter worksheet = workbook.CreateWorksheetExporter(title))
                {
                    using (IRowExporter row = worksheet.CreateRowExporter())
                    {
                        for (int idx = 0; idx < model.Count; idx++)
                        {
                            var modelCol = model[idx];
                            string columnName = modelCol.Title ?? modelCol.Field;
                            using (ICellExporter cell = row.CreateCellExporter())
                            {
                                cell.SetValue(columnName);
                                applyCellStyle(new ExportCellStyle(cell, idx, 0));
                            }
                        }
                    }
                    for (int rowIdx = 0; rowIdx < dataObject.Count; rowIdx++)
                    {
                        using (IRowExporter row = worksheet.CreateRowExporter())
                        {
                            for (int colIdx = 0; colIdx < model.Count; colIdx++)
                            {
                                using (ICellExporter cell = row.CreateCellExporter())
                                {
                                    cell.SetValue(dataObject[rowIdx][model[colIdx].Field].Value);
                                    applyCellStyle(new ExportCellStyle(cell, colIdx, rowIdx + 1));
                                }
                            }
                        }
                    }
                }
                return stream;
            }
        }
        private static object ExtractItemValue(object dataItem, string propertyName)
        {
            if (propertyName.Contains("."))
            {
                var temp = propertyName.Split(new char[] { '.' }, 2);
                return ExtractItemValue(ExtractItemValue(dataItem, temp[0]), temp[1]);
            }
            if (dataItem is DataRow)
            {
                DataRow row = (DataRow)dataItem;
                return row[propertyName];
            }
            else if (dataItem is DataRowView)
            {
                DataRowView row = (DataRowView)dataItem;
                return row[propertyName];
            }
            else
            {
                return dataItem.GetType().GetProperty(propertyName).GetValue(dataItem, null);
            }
        }

        public static Stream CollectionToStream(SpreadDocumentFormat format, object data, IList<ExportColumnSettings> model, string title, Action<ExportCellStyle> applyCellStyle)
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

            IEnumerable listEnumerable = data as IEnumerable;
            IListSource listSource = data as IListSource;
            if (listSource != null) listEnumerable = listSource.GetList();

            MemoryStream stream = new MemoryStream();
            using (IWorkbookExporter workbook = SpreadExporter.CreateWorkbookExporter(format, stream))
            {
                using (IWorksheetExporter worksheet = workbook.CreateWorksheetExporter(title))
                {
                    using (IRowExporter row = worksheet.CreateRowExporter())
                    {
                        for (int idx = 0; idx < model.Count; idx++)
                        {
                            var modelCol = model[idx];
                            string columnName = modelCol.Title ?? modelCol.Field;
                            using (ICellExporter cell = row.CreateCellExporter())
                            {
                                cell.SetValue(columnName);
                                applyCellStyle(new ExportCellStyle(cell, idx, 0));
                            }
                        }
                    }

                    if (listEnumerable != null)
                    {
                        int i = 0;
                        foreach (object item in listEnumerable)
                        {
                            using (IRowExporter row = worksheet.CreateRowExporter())
                            {
                                for (int colIdx = 0; colIdx < model.Count; colIdx++)
                                {
                                    using (ICellExporter cell = row.CreateCellExporter())
                                    {
                                        cell.SetValue(ExtractItemValue(item, properties[colIdx]).ToString());
                                        applyCellStyle(new ExportCellStyle(cell, colIdx, i + 1));
                                    }
                                }
                            }
                            i++;
                        }
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
