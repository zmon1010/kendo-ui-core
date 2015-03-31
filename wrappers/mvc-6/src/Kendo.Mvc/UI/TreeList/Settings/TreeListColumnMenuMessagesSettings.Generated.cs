using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI TreeListColumnMenuMessagesSettings class
    /// </summary>
    public partial class TreeListColumnMenuMessagesSettings<T> where T : class 
    {
        public string Columns { get; set; }

        public string Filter { get; set; }

        public string SortAscending { get; set; }

        public string SortDescending { get; set; }


        public TreeList<T> TreeList { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Columns.HasValue())
            {
                settings["columns"] = Columns;
            }

            if (Filter.HasValue())
            {
                settings["filter"] = Filter;
            }

            if (SortAscending.HasValue())
            {
                settings["sortAscending"] = SortAscending;
            }

            if (SortDescending.HasValue())
            {
                settings["sortDescending"] = SortDescending;
            }

            return settings;
        }
    }
}
