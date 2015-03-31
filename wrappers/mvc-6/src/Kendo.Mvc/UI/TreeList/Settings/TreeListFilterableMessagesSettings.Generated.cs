using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI TreeListFilterableMessagesSettings class
    /// </summary>
    public partial class TreeListFilterableMessagesSettings<T> where T : class 
    {
        public string And { get; set; }

        public string Clear { get; set; }

        public string Filter { get; set; }

        public string Info { get; set; }

        public string IsFalse { get; set; }

        public string IsTrue { get; set; }

        public string Or { get; set; }

        public string SelectValue { get; set; }

        public string Cancel { get; set; }

        public string Operator { get; set; }


        public TreeList<T> TreeList { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (And.HasValue())
            {
                settings["and"] = And;
            }

            if (Clear.HasValue())
            {
                settings["clear"] = Clear;
            }

            if (Filter.HasValue())
            {
                settings["filter"] = Filter;
            }

            if (Info.HasValue())
            {
                settings["info"] = Info;
            }

            if (IsFalse.HasValue())
            {
                settings["isFalse"] = IsFalse;
            }

            if (IsTrue.HasValue())
            {
                settings["isTrue"] = IsTrue;
            }

            if (Or.HasValue())
            {
                settings["or"] = Or;
            }

            if (SelectValue.HasValue())
            {
                settings["selectValue"] = SelectValue;
            }

            if (Cancel.HasValue())
            {
                settings["cancel"] = Cancel;
            }

            if (Operator.HasValue())
            {
                settings["operator"] = Operator;
            }

            return settings;
        }
    }
}
