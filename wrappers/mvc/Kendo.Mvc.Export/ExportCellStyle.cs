using Telerik.Documents.SpreadsheetStreaming;

namespace Kendo.Mvc
{
    public class ExportCellStyle
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
        public ExportCellStyle(ICellExporter cell, int column, int row)
        {
            this.cell = cell;
            this.column = column;
            this.row = row;
        }
    }
}
