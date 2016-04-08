using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI SpreadsheetSheet class
    /// </summary>
    public partial class SpreadsheetSheet
    {
        public DataSource DataSource
        {
            get;
            set;
        }

        public SpreadsheetSheet()
        {
        }

        public Dictionary<string, object> Serialize()
        {
            var settings = SerializeSettings();

            if (DataSource != null)
            {
                settings["dataSource"] = DataSource.ToJson();
            }

            return settings;
        }
    }
}
