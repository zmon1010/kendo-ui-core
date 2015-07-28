using System.Runtime.Serialization;

namespace Kendo.Spreadsheet
{
    /// <summary>
    /// Represents a worksheet cell
    /// </summary>
    [DataContract]
    public class Cell
    {
        /// <summary>
        /// Gets or sets the 0-based cell index
        /// </summary>
        [DataMember(Name = "index")]
        public int Index { get; set; }

        /// <summary>
        /// Gets or sets the cell format string
        /// </summary>
        [DataMember(Name = "format", EmitDefaultValue = false)]
        public string Format { get; set; }

        /// <summary>
        /// Gets or sets the cell formula
        /// </summary>
        [DataMember(Name = "formula", EmitDefaultValue = false)]
        public string Formula { get; set; }

        /// <summary>
        /// Gets or sets the cell raw value
        /// </summary>
        [DataMember(Name = "value", EmitDefaultValue = false)]
        public object Value { get; set; }
    }
}
