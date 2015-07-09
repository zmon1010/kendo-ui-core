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

        [JsonProperty(PropertyName = "format", NullValueHandling = NullValueHandling.Ignore)]
        public string Format { get; set; }

        [JsonProperty(PropertyName = "formula", NullValueHandling = NullValueHandling.Ignore)]
        public string Formula { get; set; }

        [JsonProperty(PropertyName = "value", NullValueHandling = NullValueHandling.Ignore)]
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
            MergedCells = new List<string>();
        }

        [JsonProperty(PropertyName = "columns")]
        public IList<Column> Columns { get; set; }

        [JsonProperty(PropertyName = "rows")]
        public IList<Row> Rows { get; set; }

        [JsonProperty(PropertyName = "mergedCells")]
        public IList<string> MergedCells { get; set; }
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