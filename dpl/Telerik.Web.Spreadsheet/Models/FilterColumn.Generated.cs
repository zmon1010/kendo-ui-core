using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a FilterColumn
    /// </summary>
    [DataContract]
    public partial class FilterColumn
    {
        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "criteria", EmitDefaultValue = false)]
        public string Criteria { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "filter", EmitDefaultValue = false)]
        public string Filter { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "index", EmitDefaultValue = false)]
        public double? Index { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "logic", EmitDefaultValue = false)]
        public string Logic { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "type", EmitDefaultValue = false)]
        public string Type { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "value", EmitDefaultValue = false)]
        public double? Value { get; set; }

        private List<object> values = new List<object>();

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "values")]
        public List<object> Values
        {
            set
            {
                values = value;
            }
            get
            {
                return values;
            }
        }

    }
}
