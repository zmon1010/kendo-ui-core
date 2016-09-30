using Telerik.Documents.SpreadsheetStreaming;

namespace Kendo.Mvc
{
    public class ExportColumnStyle
    {
        private IColumnExporter column;
        public IColumnExporter Column
        {
            get
            {
                return column;
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
        public ExportColumnStyle(IColumnExporter column, int index)
        {
            this.column = column;
            this.index = index;
        }
    }
}
