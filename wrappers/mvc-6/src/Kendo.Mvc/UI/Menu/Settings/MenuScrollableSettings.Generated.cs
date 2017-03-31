using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI MenuScrollableSettings class
    /// </summary>
    public partial class MenuScrollableSettings 
    {
        public double? Distance { get; set; }

        public bool? Enabled { get; set; }

        public Menu Menu { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Distance.HasValue)
            {
                settings["distance"] = Distance;
            }

            return settings;
        }
    }
}
