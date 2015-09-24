using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a Worksheet
    /// </summary>
    public partial class Worksheet
    {
        public void AddRows(IEnumerable<Row> rows)
        {
            if (Rows == null)
            {
                Rows = new List<Row>();
            }

            Rows.AddRange(rows);
        }

        public void AddRow(Row row)
        {
            AddRows(new[] { row });
        }

        public void AddMergedCells(string range)
        {
            var merged = MergedCells.GetOrDefault();

            merged.Add(range);

            MergedCells = merged;
        }
    }
}

