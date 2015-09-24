using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a Worksheet
    /// </summary>
    [DataContract]
    public partial class Worksheet
    {
        /// <summary>
        /// The active cell in the sheet, e.g. "A1".
        /// </summary>
        [DataMember(Name = "activeCell", EmitDefaultValue = false)]
        public string ActiveCell { get; set; }

        /// <summary>
        /// The name of the sheet.
        /// </summary>
        [DataMember(Name = "name", EmitDefaultValue = false)]
        public string Name { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "columns", EmitDefaultValue = false)]
        public List<Column> Columns
        {
            get;
            set;
        }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "filter", EmitDefaultValue = false)]
        public Filter Filter
        {
            get;
            set;
        }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "frozenColumns", EmitDefaultValue = false)]
        public int? FrozenColumns { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "frozenRows", EmitDefaultValue = false)]
        public int? FrozenRows { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "rows", EmitDefaultValue = false)]
        public List<Row> Rows
        {
            get;
            set;
        }

        /// <summary>
        /// The selected range in the sheet, e.g. "A1:B10".
        /// </summary>
        [DataMember(Name = "selection", EmitDefaultValue = false)]
        public string Selection { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "sort", EmitDefaultValue = false)]
        public Sort Sort
        {
            get;
            set;
        }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "mergedCells", EmitDefaultValue = false)]
        public List<string> MergedCells
        {
            get;
            set;
        }

    }
}
