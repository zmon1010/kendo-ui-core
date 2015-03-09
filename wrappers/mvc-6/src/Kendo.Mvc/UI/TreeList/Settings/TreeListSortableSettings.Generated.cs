using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI TreeListSortableSettings class
    /// </summary>
    public partial class TreeListSortableSettings 
    {
        public bool? AllowUnsort { get; set; }

        public string Mode { get; set; }


        public bool Enabled { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (AllowUnsort.HasValue)
            {
                settings["allowUnsort"] = AllowUnsort;
            }

            if (Mode.HasValue())
            {
                settings["mode"] = Mode;
            }


            return settings;
        }
    }
}
