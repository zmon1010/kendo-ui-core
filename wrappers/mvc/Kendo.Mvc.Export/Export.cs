using Newtonsoft.Json;
using System.IO;
using Telerik.Documents.SpreadsheetStreaming;
using System;

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

        public static string GetMimeType(SpreadDocumentFormat exportFormat)
        {
            return exportFormat == SpreadDocumentFormat.Csv ? "text/csv" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        }
    }
}
