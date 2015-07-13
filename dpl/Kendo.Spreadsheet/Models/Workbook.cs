using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Kendo.Spreadsheet
{
    [DataContract]
    public partial class Workbook
    {
        public Workbook()
        {
            Sheets = new List<Worksheet>();
        }

        [DataMember(Name = "sheets")]
        public IList<Worksheet> Sheets { get; set; }
    }
}
