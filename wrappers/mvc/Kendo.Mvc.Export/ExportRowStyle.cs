using Telerik.Documents.SpreadsheetStreaming;

namespace Kendo.Mvc.Export
{
    public class ExportRowStyle
    {
        private IRowExporter row;

        /// <summary>
        /// Current row instance
        /// </summary>        
        public IRowExporter Row
        {
            get
            {
                return row;
            }
        }
        
        private int index;

        /// <summary>
        /// Current row index
        /// </summary>        
        public int Index
        {
            get
            {
                return index;
            }
        }

        /// <summary>
        /// ExportRowStyle constructor
        /// </summary>
        /// <param name="row">Row instance</param>
        /// <param name="index">Row index</param>        
        public ExportRowStyle(IRowExporter row, int index)
        {
            this.index = index;
            this.row = row;
        }
    }
}
