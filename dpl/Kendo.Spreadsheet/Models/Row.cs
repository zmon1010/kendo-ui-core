using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Kendo.Spreadsheet
{
    /// <summary>
    /// Represents a Worksheet row
    /// </summary>
    [DataContract]
    public class Row
    {
        /// <summary>
        /// Initializes a new Row instance
        /// </summary>
        public Row()
        {
            Cells = new List<Cell>();
        }

        /// <summary>
        /// Gets or sets the zero-based index of the Row
        /// </summary>
        [DataMember(Name = "index")]
        public int Index { get; set; }

        /// <summary>
        /// Gets or sets the list of individual Cells in this Row
        /// </summary>
        [DataMember(Name = "cells")]
        public IList<Cell> Cells { get; set; }
    }
}
