using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI TreeListColumnSortableSettings class
    /// </summary>
    public partial class TreeListColumnSortableSettings<T> 
    {
        public ClientHandlerDescriptor Compare { get; set; }


        public bool Enabled { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Compare.HasValue())
            {
                settings["compare"] = Compare;
            }


            return settings;
        }
    }
}
