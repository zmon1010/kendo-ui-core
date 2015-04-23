using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ChartSerieStackSettings class
    /// </summary>
    public partial class ChartSerieStackSettings 
    {
        public string Type { get; set; }

        public string Group { get; set; }

        public bool Enabled { get; set; }

        public Chart Chart { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Type?.HasValue() == true)
            {
                settings["type"] = Type;
            }

            if (Group?.HasValue() == true)
            {
                settings["group"] = Group;
            }

            return settings;
        }
    }
}
