using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a BorderStyle
    /// </summary>
    [DataContract]
    public partial class BorderStyle
    {
        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "size", EmitDefaultValue = false)]
        public double? Size { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "color", EmitDefaultValue = false)]
        public string Color { get; set; }

    }
}
