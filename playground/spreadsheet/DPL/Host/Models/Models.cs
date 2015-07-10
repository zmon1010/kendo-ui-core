using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Host.DTO
{
    [DataContract]
    public class Cell
    {
        [DataMember(Name = "index")]
        public int Index { get; set; }

        [DataMember(Name = "format", EmitDefaultValue = false)]
        public string Format { get; set; }

        [DataMember(Name = "formula", EmitDefaultValue = false)]
        public string Formula { get; set; }

        [DataMember(Name = "value", EmitDefaultValue = false)]
        public object Value { get; set; }
    }

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

    [DataContract]
    public class Column
    {
        [DataMember(Name = "index")]
        public int Index { get; set; }
    }

    [DataContract]
    public class Sheet
    {
        public Sheet()
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

    [DataContract]
    public class Workbook
    {
        public Workbook()
        {
            Sheets = new List<Sheet>();
        }

        [DataMember(Name = "sheets")]
        public IList<Sheet> Sheets { get; set; }
    }
}