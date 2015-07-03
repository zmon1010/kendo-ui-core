using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Host.DTO
{
    public class Cell
    {
        [JsonProperty(PropertyName = "index")]
        public int Index { get; set; }

        [JsonProperty(PropertyName = "format")]
        public object Format { get; set; }

        [JsonProperty(PropertyName = "value")]
        public object Value { get; set; }
    }

    public class Row
    {
        public Row()
        {
            Cells = new List<Cell>();
        }

        [JsonProperty(PropertyName = "index")]
        public int Index { get; set; }

        [JsonProperty(PropertyName = "cells")]
        public IList<Cell> Cells { get; set; }
    }

    public class Column
    {
        [JsonProperty(PropertyName = "index")]
        public int Index { get; set; }
    }

    public class Sheet
    {
        public Sheet()
        {
            Columns = new List<Column>();
            Rows = new List<Row>();
        }

        [JsonProperty(PropertyName = "columns")]
        public IList<Column> Columns { get; set; }

        [JsonProperty(PropertyName = "rows")]
        public IList<Row> Rows { get; set; }
    }

    public class Workbook
    {
        public Workbook()
        {
            Sheets = new List<Sheet>();
        }

        [JsonProperty(PropertyName = "sheets")]
        public IList<Sheet> Sheets { get; set; }
    }
}