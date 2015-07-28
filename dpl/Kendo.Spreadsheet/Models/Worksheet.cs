using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Kendo.Spreadsheet
{
    /// <summary>
    /// Represents a Worksheet with a collection of Rows and Columns
    /// </summary>
    [DataContract]
    public class Worksheet
    {
        /// <summary>
        /// Creates a new Worksheet instance
        /// </summary>
        public Worksheet()
        {
            Columns = new List<Column>();
            Rows = new List<Row>();
            MergedCells = new List<string>();
        }

        /// <summary>
        /// Gets or sets a collection of Columns for this Worksheeet
        /// </summary>
        [DataMember(Name = "columns")]
        public IList<Column> Columns { get; set; }

        /// <summary>
        /// Gets or sets a collection of Rows for this Worksheeet
        /// </summary>
        [DataMember(Name = "rows")]
        public IList<Row> Rows { get; set; }

        /// <summary>
        /// Gets or sets a collection of merged cell ranges in A1 notation
        /// </summary>
        [DataMember(Name = "mergedCells", EmitDefaultValue = false)]
        public IList<string> MergedCells { get; set; }

        /// <summary>
        /// Gets or sets the number of frozen rows from the top
        /// </summary>
        [DataMember(Name = "frozenRows", EmitDefaultValue = false)]
        public int FrozenRows { get; set; }

        /// <summary>
        /// Gets or sets the number of frozen columns from the left
        /// </summary>
        [DataMember(Name = "frozenColumns", EmitDefaultValue = false)]
        public int FrozenColumns { get; set; }
    }
}
