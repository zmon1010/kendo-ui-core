using Telerik.Documents.SpreadsheetStreaming;

namespace Kendo.Mvc
{
    public class ExportRowStyle
    {
        private IRowExporter row;
        public IRowExporter Row
        {
            get
            {
                return row;
            }
        }
        private int index;
        public int Index
        {
            get
            {
                return index;
            }
        }
        public ExportRowStyle(IRowExporter row, int index)
        {
            this.index = index;
            this.row = row;
        }
    }
}
