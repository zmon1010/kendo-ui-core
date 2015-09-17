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

        private List<Worksheet> sheets = new List<Worksheet>();

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "sheets")]
        public List<Worksheet> Sheets
        {
            set
            {
                sheets = value;
            }
            get
            {
                return sheets;
            }
        }

    }
}
