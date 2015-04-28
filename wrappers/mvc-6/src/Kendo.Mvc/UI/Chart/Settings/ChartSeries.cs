using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartSeries class
    /// </summary>
    public partial class ChartSeries
    {
        public IEnumerable Data { get; set; }

        public Dictionary<string, object> Serialize()
        {
            var settings = SerializeSettings();

            if (Data != null)
            {
                settings["data"] = Data;
            }

            return settings;
        }
    }
}
