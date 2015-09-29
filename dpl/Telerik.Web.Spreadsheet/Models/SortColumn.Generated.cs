using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a SortColumn
    /// </summary>
    [DataContract]
    public partial class SortColumn
    {
        /// <summary>
        /// Indicates if the data in the cell should be sorted ascending (true) or descending or (false).
        /// </summary>
        [DataMember(Name = "ascending", EmitDefaultValue = false)]
        public bool? Ascending { get; set; }

        /// <summary>
        /// The index of the column within the sheet.For example, column C will have index 2.
        /// </summary>
        [DataMember(Name = "index", EmitDefaultValue = false)]
        public double? Index { get; set; }

    }
}
