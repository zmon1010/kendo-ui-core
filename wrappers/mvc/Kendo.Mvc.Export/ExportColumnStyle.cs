using Telerik.Documents.SpreadsheetStreaming;

namespace Kendo.Mvc.Export
{
    public class ExportColumnStyle
    {
        private string name;

        /// <summary>
        /// Column name
        /// </summary>
        public string Name
        {
            get
            {
                return name;
            }
        }

        private IColumnExporter column;

        /// <summary>
        /// Current column instance
        /// </summary>        
        public IColumnExporter Column
        {
            get
            {
                return column;
            }
        }

        private int index;

        /// <summary>
        /// Current column index
        /// </summary>        
        public int Index
        {
            get
            {
                return index;
            }
        }

        /// <summary>
        /// ExportColumnStyle constructor
        /// </summary>
        /// <param name="column">Column instance</param>
        /// <param name="index">Column index</param>     
        public ExportColumnStyle(IColumnExporter column, int index, string name)
        {
            this.column = column;
            this.index = index;
            this.name = name;
        }
    }
}
