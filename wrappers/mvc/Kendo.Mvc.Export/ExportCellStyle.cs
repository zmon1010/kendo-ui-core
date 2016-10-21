using Telerik.Documents.SpreadsheetStreaming;

namespace Kendo.Mvc.Export
{
    public class ExportCellStyle
    {
        private ICellExporter cell;

        /// <summary>
        /// Current cell instance
        /// </summary>        
        public ICellExporter Cell
        {
            get
            {
                return cell;
            }
        }

        private int column;

        /// <summary>
        /// Current column index
        /// </summary>        
        public int Column
        {
            get
            {
                return column;
            }
        }

        private int row;

        /// <summary>
        /// Current row index
        /// </summary>        
        public int Row
        {
            get
            {
                return row;
            }
        }

        /// <summary>
        /// ExportCellStyle constructor
        /// </summary>
        /// <param name="cell">Cell instance</param>
        /// <param name="column">Column index</param>
        /// <param name="row">Row index</param>        
        public ExportCellStyle(ICellExporter cell, int column, int row)
        {
            this.cell = cell;
            this.column = column;
            this.row = row;
        }
    }
}
