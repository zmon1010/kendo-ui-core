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
        private List<Cell> cells = new List<Cell>();

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "cells")]
        public List<Cell> Cells
        {
            set
            {
                cells = value;
            }
            get
            {
                return cells;
            }
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
