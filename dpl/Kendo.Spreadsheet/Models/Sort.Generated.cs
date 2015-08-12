using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Kendo.Spreadsheet
{
    /// <summary>
    /// Represents a Sort
    /// </summary>
    [DataContract]
    public partial class Sort
    {
        private List<SortColumn> columns = new List<SortColumn>();

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "columns")]
        public List<SortColumn> Columns
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

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "ref", EmitDefaultValue = false)]
        public string Ref { get; set; }

    }
}
