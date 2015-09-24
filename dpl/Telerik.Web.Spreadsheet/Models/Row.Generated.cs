using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a Row
    /// </summary>
    [DataContract]
    public partial class Row
    {
        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "cells", EmitDefaultValue = false)]
        public List<Cell> Cells
        {
            get;
            set;
        }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "height", EmitDefaultValue = false)]
        public double? Height { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "index", EmitDefaultValue = false)]
        public int? Index { get; set; }

    }
}
