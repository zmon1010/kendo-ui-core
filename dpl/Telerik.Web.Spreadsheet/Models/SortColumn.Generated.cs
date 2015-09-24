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
        /// 
        /// </summary>
        [DataMember(Name = "ascending", EmitDefaultValue = false)]
        public bool? Ascending { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "index", EmitDefaultValue = false)]
        public double? Index { get; set; }

    }
}
