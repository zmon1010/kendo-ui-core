using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization;

namespace Kendo.Spreadsheet
{
    [DataContract]
    public class Workbook
    {
        public Workbook()
        {
            Sheets = new List<Worksheet>();
        }

        [DataMember(Name = "sheets")]
        public IList<Worksheet> Sheets { get; set; }
    }
}
