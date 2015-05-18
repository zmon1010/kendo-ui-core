using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI PivotGridMessagesSettings class
    /// </summary>
    public partial class PivotGridMessagesSettings<T> where T : class 
    {
        public string MeasureFields { get; set; }

        public string ColumnFields { get; set; }

        public string RowFields { get; set; }

        public PivotGridMessagesFieldMenuSettings<T> FieldMenu { get; } = new PivotGridMessagesFieldMenuSettings<T>();


        public PivotGrid<T> PivotGrid { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (MeasureFields?.HasValue() == true)
            {
                settings["measureFields"] = MeasureFields;
            }

            if (ColumnFields?.HasValue() == true)
            {
                settings["columnFields"] = ColumnFields;
            }

            if (RowFields?.HasValue() == true)
            {
                settings["rowFields"] = RowFields;
            }

            var fieldMenu = FieldMenu.Serialize();
            if (fieldMenu.Any())
            {
                settings["fieldMenu"] = fieldMenu;
            }

            return settings;
        }
    }
}
