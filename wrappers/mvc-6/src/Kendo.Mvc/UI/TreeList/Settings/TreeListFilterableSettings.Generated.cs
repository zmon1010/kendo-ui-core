using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI TreeListFilterableSettings class
    /// </summary>
    public partial class TreeListFilterableSettings<T> 
    {
        public bool? Extra { get; set; }


        public bool Enabled { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Extra.HasValue)
            {
                settings["extra"] = Extra;
            }


            return settings;
        }
    }
}
