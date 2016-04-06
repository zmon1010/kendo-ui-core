using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI SpreadsheetSheetRow class
    /// </summary>
    public partial class SpreadsheetSheetRow 
    {
        public List<SpreadsheetSheetRowCell> Cells { get; set; } = new List<SpreadsheetSheetRowCell>();

        public double? Height { get; set; }

        public int? Index { get; set; }


        public Spreadsheet Spreadsheet { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            var cells = Cells.Select(i => i.Serialize());
            if (cells.Any())
            {
                settings["cells"] = cells;
            }

            if (Height.HasValue)
            {
                settings["height"] = Height;
            }

            if (Index.HasValue)
            {
                settings["index"] = Index;
            }

            return settings;
        }
    }
}
