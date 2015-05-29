using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartTitleSettings class
    /// </summary>
    public partial class ChartSeriesDefaultsSettings 
    {
        public ChartSeries Area { get; } = new ChartSeries();

        public Dictionary<string, object> Serialize()
        {
            var settings = new Dictionary<string, object>();

            var area = Area.Serialize();
            if (area.Any())
            {
                settings["area"] = area;
            }

            return settings;
        }
    }
}
