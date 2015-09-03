using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a Column
    /// </summary>
    [DataContract]
    public partial class Column
    {
        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "index", EmitDefaultValue = false)]
        public double Index { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "width", EmitDefaultValue = false)]
        public double Width { get; set; }

    }
}
