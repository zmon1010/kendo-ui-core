using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Kendo.Spreadsheet
{
    /// <summary>
    /// Represents a Workbook with a collection of Worksheets
    /// </summary>
    [DataContract]
    public partial class Workbook
    {
        /// <summary>
        /// Creates an empty Workbook instance
        /// </summary>
        public Workbook()
        {
            Sheets = new List<Worksheet>();
        }

        /// <summary>
        /// Gets or sets the collection of Worksheets for this workbook
        /// </summary>
        [DataMember(Name = "sheets")]
        public IList<Worksheet> Sheets { get; set; }
    }
}
