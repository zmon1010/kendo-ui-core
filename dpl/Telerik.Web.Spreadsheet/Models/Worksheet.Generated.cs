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

        private List<Column> columns = new List<Column>();

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "columns")]
        public List<Column> Columns
        {
            set
            {
                columns = value;
            }
            get
            {
                return columns;
            }
        }

        private Filter filter = new Filter();

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "filter")]
        public Filter Filter
        {
            set
            {
                filter = value;
            }
            get
            {
                return filter;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "frozenColumns", EmitDefaultValue = false)]
        public int FrozenColumns { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "frozenRows", EmitDefaultValue = false)]
        public int FrozenRows { get; set; }

        private List<Row> rows = new List<Row>();

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "rows")]
        public List<Row> Rows
        {
            set
            {
                rows = value;
            }
            get
            {
                return rows;
            }
        }

        /// <summary>
        /// The selected range in the sheet, e.g. "A1:B10".
        /// </summary>
        [DataMember(Name = "selection", EmitDefaultValue = false)]
        public string Selection { get; set; }

        private Sort sort = new Sort();

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "sort")]
        public Sort Sort
        {
            set
            {
                sort = value;
            }
            get
            {
                return sort;
            }
        }

        private List<string> mergedCells = new List<string>();

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "mergedCells")]
        public List<string> MergedCells
        {
            set
            {
                mergedCells = value;
            }
            get
            {
                return mergedCells;
            }
        }

    }
}
