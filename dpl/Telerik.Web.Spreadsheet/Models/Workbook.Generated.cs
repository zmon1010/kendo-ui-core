using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a Workbook
    /// </summary>
    [DataContract]
    public partial class Workbook
    {
        /// <summary>
        /// The name of the currently active sheet.
        /// </summary>
        [DataMember(Name = "activeSheet", EmitDefaultValue = false)]
        public string ActiveSheet { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "sheets", EmitDefaultValue = false)]
        public List<Worksheet> Sheets
        {
            get;
            set;
        }

    }
}
