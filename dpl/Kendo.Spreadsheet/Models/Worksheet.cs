using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Kendo.Spreadsheet
{
    [DataContract]
    public class Worksheet
    {
        public Worksheet()
        {
            Columns = new List<Column>();
            Rows = new List<Row>();
            MergedCells = new List<string>();
        }

        [DataMember(Name = "columns")]
        public IList<Column> Columns { get; set; }

        [DataMember(Name = "rows")]
        public IList<Row> Rows { get; set; }

        [DataMember(Name = "mergedCells", EmitDefaultValue = false)]
        public IList<string> MergedCells { get; set; }

        [DataMember(Name = "frozenRows", EmitDefaultValue = false)]
        public int FrozenRows { get; set; }

        [DataMember(Name = "frozenColumns", EmitDefaultValue = false)]
        public int FrozenColumns { get; set; }
    }
}
