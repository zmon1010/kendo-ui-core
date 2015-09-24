using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a Filter
    /// </summary>
    [DataContract]
    public partial class Filter
    {
        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "columns", EmitDefaultValue = false)]
        public List<FilterColumn> Columns
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
