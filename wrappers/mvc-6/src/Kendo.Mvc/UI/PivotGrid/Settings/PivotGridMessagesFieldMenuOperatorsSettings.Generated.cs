using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI PivotGridMessagesFieldMenuOperatorsSettings class
    /// </summary>
    public partial class PivotGridMessagesFieldMenuOperatorsSettings<T> where T : class 
    {
        public string Contains { get; set; }

        public string Doesnotcontain { get; set; }

        public string Startswith { get; set; }

        public string Endswith { get; set; }

        public string Eq { get; set; }

        public string Neq { get; set; }


        public PivotGrid<T> PivotGrid { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Contains?.HasValue() == true)
            {
                settings["contains"] = Contains;
            }

            if (Doesnotcontain?.HasValue() == true)
            {
                settings["doesnotcontain"] = Doesnotcontain;
            }

            if (Startswith?.HasValue() == true)
            {
                settings["startswith"] = Startswith;
            }

            if (Endswith?.HasValue() == true)
            {
                settings["endswith"] = Endswith;
            }

            if (Eq?.HasValue() == true)
            {
                settings["eq"] = Eq;
            }

            if (Neq?.HasValue() == true)
            {
                settings["neq"] = Neq;
            }

            return settings;
        }
    }
}
