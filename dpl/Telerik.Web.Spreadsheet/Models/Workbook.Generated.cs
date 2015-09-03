using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a Workbook
    /// </summary>
    [DataContract]
    public partial class Workbook
    {
        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "columnWidth", EmitDefaultValue = false)]
        public double ColumnWidth { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "columns", EmitDefaultValue = false)]
        public double Columns { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "headerHeight", EmitDefaultValue = false)]
        public double HeaderHeight { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "headerWidth", EmitDefaultValue = false)]
        public double HeaderWidth { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "rowHeight", EmitDefaultValue = false)]
        public double RowHeight { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "rows", EmitDefaultValue = false)]
        public double Rows { get; set; }

        private List<Worksheet> sheets = new List<Worksheet>();

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "sheets")]
        public List<Worksheet> Sheets
        {
            set
            {
                sheets = value;
            }
            get
            {
                return sheets;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "toolbar", EmitDefaultValue = false)]
        public bool Toolbar { get; set; }

    }
}
