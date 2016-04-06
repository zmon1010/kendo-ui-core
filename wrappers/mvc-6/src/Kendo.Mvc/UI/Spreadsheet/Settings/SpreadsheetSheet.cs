using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
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
            private set;
        }

        public SpreadsheetSheet()
        {
            DataSource = new DataSource(Spreadsheet.ModelMetadataProvider)
            {
                Type = DataSourceType.Server,
                ServerAggregates = true,
                ServerFiltering = true,
                ServerGrouping = true,
                ServerPaging = true,
                ServerSorting = true
            };
        }

        public Dictionary<string, object> Serialize()
        {
            var settings = SerializeSettings();

            settings["dataSource"] = (Dictionary<string, object>)DataSource.ToJson();

            return settings;
        }
    }
}
