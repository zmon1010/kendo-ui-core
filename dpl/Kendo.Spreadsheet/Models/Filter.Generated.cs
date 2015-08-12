using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Kendo.Spreadsheet
{
    /// <summary>
    /// Represents a Filter
    /// </summary>
    [DataContract]
    public partial class Filter
    {
        private List<FilterColumn> columns = new List<FilterColumn>();

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "columns")]
        public List<FilterColumn> Columns
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
