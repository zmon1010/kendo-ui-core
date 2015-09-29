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
        /// An array defining the filter configuration of individual columns.
        /// </summary>
        [DataMember(Name = "columns", EmitDefaultValue = false)]
        public List<FilterColumn> Columns
        {
            get;
            set;
        }

        /// <summary>
        /// The active range for the filter, e.g. "B1:D8".
        /// </summary>
        [DataMember(Name = "ref", EmitDefaultValue = false)]
        public string Ref { get; set; }

    }
}
