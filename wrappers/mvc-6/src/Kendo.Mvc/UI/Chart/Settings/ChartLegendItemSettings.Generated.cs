using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartLegendItemSettings class
    /// </summary>
    public partial class ChartLegendItemSettings 
    {
        public string Cursor { get; set; }

        public ClientHandlerDescriptor Visual { get; set; }


        public Chart Chart { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Cursor?.HasValue() == true)
            {
                settings["cursor"] = Cursor;
            }

            if (Visual?.HasValue() == true)
            {
                settings["visual"] = Visual;
            }

            return settings;
        }
    }
}
