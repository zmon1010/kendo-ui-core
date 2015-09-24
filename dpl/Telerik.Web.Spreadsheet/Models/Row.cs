using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a Row
    /// </summary>
    public partial class Row
    {
        public void AddCells(IEnumerable<Cell> cells)
        {
            if (Cells == null)
            {
                Cells = new List<Cell>();
            }

            Cells.AddRange(cells);
        }

        public void AddCell(Cell cell)
        {
            AddCells(new[] { cell });
        }
    }
}

