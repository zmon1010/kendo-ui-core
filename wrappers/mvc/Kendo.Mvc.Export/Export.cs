using Newtonsoft.Json;
using System.IO;
using Telerik.Documents.SpreadsheetStreaming;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Collections;
using System.Linq;

namespace Kendo.Mvc
{
    public class GridExportCellCreatedEvent : EventArgs
    {
        private ICellExporter cell;
        public ICellExporter Cell
        {
            get
            {
                return cell;
            }
        }
        private int column;
        public int Column
        {
            get
            {
                return column;
            }
        }
        private int row;
        public int Row
        {
            get
            {
                return row;
            }
        }
        public GridExportCellCreatedEvent(ICellExporter cell, int column, int row)
        {
            this.cell = cell;
            this.column = column;
            this.row = row;
        }
    }

    public static class Export
    {
        public static event GridExportCellCreatedEventHandler CellCreated;
        public delegate void GridExportCellCreatedEventHandler(object sender, GridExportCellCreatedEvent e);

        public static Stream JsonToStream(SpreadDocumentFormat format, string data, string model, string title)
        {
            var modelObject = JsonConvert.DeserializeObject<dynamic>(model);
            var dataObject = JsonConvert.DeserializeObject<dynamic>(data);

            MemoryStream stream = new MemoryStream();
            using (IWorkbookExporter workbook = SpreadExporter.CreateWorkbookExporter(format, stream))
            {
                using (IWorksheetExporter worksheet = workbook.CreateWorksheetExporter(title))
                {
                    using (IRowExporter row = worksheet.CreateRowExporter())
                    {
                        for (int idx = 0; idx < modelObject.Count; idx++)
                        {
                            var modelCol = modelObject[idx];
                            string columnName = modelCol.title ?? modelCol.field;
                            using (ICellExporter cell = row.CreateCellExporter())
                            {
                                cell.SetValue(columnName);
                                CellCreated.Invoke(typeof(GridExportCellCreatedEvent), new GridExportCellCreatedEvent(cell, idx, 0));
                            }
                        }
                    }
                    for (int rowIdx = 0; rowIdx < dataObject.Count; rowIdx++)
                    {
                        using (IRowExporter row = worksheet.CreateRowExporter())
                        {
                            for (int colIdx = 0; colIdx < modelObject.Count; colIdx++)
                            {
                                using (ICellExporter cell = row.CreateCellExporter())
                                {
                                    cell.SetValue(dataObject[rowIdx][modelObject[colIdx].field.ToString()].ToString());
                                    CellCreated.Invoke(typeof(GridExportCellCreatedEvent), new GridExportCellCreatedEvent(cell, colIdx, rowIdx + 1));
                                }
                            }
                        }
                    }
                }
                return stream;
            }
        }

        public static Stream CollectionToStream(SpreadDocumentFormat format, object data, string model, string title)
        {
            var modelObject = JsonConvert.DeserializeObject<dynamic>(model);
            Dictionary<int, string> properties = new Dictionary<int, string>();
            for (int colIdx = 0; colIdx < modelObject.Count; colIdx++)
            {
                properties[colIdx] = modelObject[colIdx].field.ToString();
            }

            IEnumerable listEnumerable = data as IEnumerable;

            MemoryStream stream = new MemoryStream();
            using (IWorkbookExporter workbook = SpreadExporter.CreateWorkbookExporter(format, stream))
            {
                using (IWorksheetExporter worksheet = workbook.CreateWorksheetExporter(title))
                {
                    using (IRowExporter row = worksheet.CreateRowExporter())
                    {
                        for (int idx = 0; idx < modelObject.Count; idx++)
                        {
                            var modelCol = modelObject[idx];
                            string columnName = modelCol.title ?? modelCol.field;
                            using (ICellExporter cell = row.CreateCellExporter())
                            {
                                cell.SetValue(columnName);
                                CellCreated.Invoke(typeof(GridExportCellCreatedEvent), new GridExportCellCreatedEvent(cell, idx, 0));
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
                                for (int colIdx = 0; colIdx < modelObject.Count; colIdx++)
                                {
                                    using (ICellExporter cell = row.CreateCellExporter())
                                    {
                                        cell.SetValue(item.GetType().GetProperty(properties[colIdx]).GetValue(item, null).ToString());
                                        CellCreated.Invoke(typeof(GridExportCellCreatedEvent), new GridExportCellCreatedEvent(cell, colIdx, i + 1));
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
