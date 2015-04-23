using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartSerieErrorBarsLineSettings class
    /// </summary>
    public partial class ChartSerieErrorBarsLineSettings 
    {
        public double? Width { get; set; }

        public string DashType { get; set; }


        public Chart Chart { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Width.HasValue)
            {
                settings["width"] = Width;
            }

            if (DashType?.HasValue() == true)
            {
                settings["dashType"] = DashType;
            }

            return settings;
        }
    }
}
