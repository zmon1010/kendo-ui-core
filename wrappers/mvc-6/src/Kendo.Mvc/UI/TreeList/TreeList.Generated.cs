using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI TreeList component
    /// </summary>
    public partial class TreeList<T> where T : class 
    {
        public bool? AutoBind { get; set; }

        public bool? Reorderable { get; set; }


        public TreeListColumnMenuSettings ColumnMenu { get; } = new TreeListColumnMenuSettings();

        public TreeListEditableSettings Editable { get; } = new TreeListEditableSettings();

        public TreeListExcelSettings Excel { get; } = new TreeListExcelSettings();

        public TreeListFilterableSettings Filterable { get; } = new TreeListFilterableSettings();
        public double? Height { get; set; }


        public TreeListMessagesSettings Messages { get; } = new TreeListMessagesSettings();

        public TreeListPdfSettings Pdf { get; } = new TreeListPdfSettings();
        public bool? Scrollable { get; set; }

        public bool? Selectable { get; set; }


        public TreeListSortableSettings Sortable { get; } = new TreeListSortableSettings();


        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            if (AutoBind.HasValue)
            {
                settings["autoBind"] = AutoBind;
            }

            if (Reorderable.HasValue)
            {
                settings["reorderable"] = Reorderable;
            }

            var columnMenu = ColumnMenu.Serialize();
            if (columnMenu.Any())
            {
                settings["columnMenu"] = columnMenu;
            }
            else if (ColumnMenu.Enabled) {
                settings["columnMenu"] = ColumnMenu.Enabled;
            }

            var editable = Editable.Serialize();
            if (editable.Any())
            {
                settings["editable"] = editable;
            }
            else if (Editable.Enabled) {
                settings["editable"] = Editable.Enabled;
            }

            var excel = Excel.Serialize();
            if (excel.Any())
            {
                settings["excel"] = excel;
            }

            var filterable = Filterable.Serialize();
            if (filterable.Any())
            {
                settings["filterable"] = filterable;
            }
            else if (Filterable.Enabled) {
                settings["filterable"] = Filterable.Enabled;
            }

            if (Height.HasValue)
            {
                settings["height"] = Height;
            }

            var messages = Messages.Serialize();
            if (messages.Any())
            {
                settings["messages"] = messages;
            }

            var pdf = Pdf.Serialize();
            if (pdf.Any())
            {
                settings["pdf"] = pdf;
            }

            if (Scrollable.HasValue)
            {
                settings["scrollable"] = Scrollable;
            }

            if (Selectable.HasValue)
            {
                settings["selectable"] = Selectable;
            }

            var sortable = Sortable.Serialize();
            if (sortable.Any())
            {
                settings["sortable"] = sortable;
            }
            else if (Sortable.Enabled) {
                settings["sortable"] = Sortable.Enabled;
            }


            return settings;
        }
    }
}
