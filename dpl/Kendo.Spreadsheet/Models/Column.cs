using System.Runtime.Serialization;

namespace Kendo.Spreadsheet
{
    /// <summary>
    /// Represents a Worksheet column
    /// </summary>
    [DataContract]
    public class Column
    {
        /// <summary>
        /// Gets or sets the column zero-based index
        /// </summary>
        [DataMember(Name = "index")]
        public int Index { get; set; }
    }
}
