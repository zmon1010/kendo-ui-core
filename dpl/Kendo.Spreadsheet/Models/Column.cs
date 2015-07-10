using System.Runtime.Serialization;

namespace Kendo.Spreadsheet
{
    [DataContract]
    public class Column
    {
        [DataMember(Name = "index")]
        public int Index { get; set; }
    }
}
