using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Kendo.Spreadsheet
{
    [DataContract]
    public class Row
    {
        public Row()
        {
            Cells = new List<Cell>();
        }

        [DataMember(Name = "index")]
        public int Index { get; set; }

        [DataMember(Name = "cells")]
        public IList<Cell> Cells { get; set; }
    }
}
