using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI StockChartNavigatorSelectSettings class
    /// </summary>
    public partial class StockChartNavigatorSelectSettings<T> where T : class 
    {
        public DateTime? From { get; set; }

        public DateTime? To { get; set; }


        public StockChart<T> StockChart { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (From.HasValue)
            {
                settings["from"] = From;
            }

            if (To.HasValue)
            {
                settings["to"] = To;
            }

            return settings;
        }
    }
}
