using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a Sort
    /// </summary>
    [DataContract]
    public partial class Sort
    {
        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "columns", EmitDefaultValue = false)]
        public List<SortColumn> Columns
        {
            get;
            set;
        }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "ref", EmitDefaultValue = false)]
        public string Ref { get; set; }

    }
}
