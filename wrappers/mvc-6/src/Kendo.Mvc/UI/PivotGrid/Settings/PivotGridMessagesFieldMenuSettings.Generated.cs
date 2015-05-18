using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI PivotGridMessagesFieldMenuSettings class
    /// </summary>
    public partial class PivotGridMessagesFieldMenuSettings<T> where T : class 
    {
        public string Info { get; set; }

        public string SortAscending { get; set; }

        public string SortDescending { get; set; }

        public string FilterFields { get; set; }

        public string Filter { get; set; }

        public string Include { get; set; }

        public string Title { get; set; }

        public string Clear { get; set; }

        public string Ok { get; set; }

        public string Cancel { get; set; }

        public PivotGridMessagesFieldMenuOperatorsSettings<T> Operators { get; } = new PivotGridMessagesFieldMenuOperatorsSettings<T>();


        public PivotGrid<T> PivotGrid { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Info?.HasValue() == true)
            {
                settings["info"] = Info;
            }

            if (SortAscending?.HasValue() == true)
            {
                settings["sortAscending"] = SortAscending;
            }

            if (SortDescending?.HasValue() == true)
            {
                settings["sortDescending"] = SortDescending;
            }

            if (FilterFields?.HasValue() == true)
            {
                settings["filterFields"] = FilterFields;
            }

            if (Filter?.HasValue() == true)
            {
                settings["filter"] = Filter;
            }

            if (Include?.HasValue() == true)
            {
                settings["include"] = Include;
            }

            if (Title?.HasValue() == true)
            {
                settings["title"] = Title;
            }

            if (Clear?.HasValue() == true)
            {
                settings["clear"] = Clear;
            }

            if (Ok?.HasValue() == true)
            {
                settings["ok"] = Ok;
            }

            if (Cancel?.HasValue() == true)
            {
                settings["cancel"] = Cancel;
            }

            var operators = Operators.Serialize();
            if (operators.Any())
            {
                settings["operators"] = operators;
            }

            return settings;
        }
    }
}
