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

        public List<TreeListColumn<T>> Columns { get; set; } = new List<TreeListColumn<T>>();

        public bool? Resizable { get; set; }

        public bool? Reorderable { get; set; }

        public TreeListColumnMenuSettings<T> ColumnMenu { get; } = new TreeListColumnMenuSettings<T>();

        public TreeListEditableSettings<T> Editable { get; } = new TreeListEditableSettings<T>();

        public TreeListExcelSettings<T> Excel { get; } = new TreeListExcelSettings<T>();

        public TreeListFilterableSettings<T> Filterable { get; } = new TreeListFilterableSettings<T>();

        public double? Height { get; set; }

        public TreeListMessagesSettings<T> Messages { get; } = new TreeListMessagesSettings<T>();

        public TreeListPdfSettings<T> Pdf { get; } = new TreeListPdfSettings<T>();

        public bool? Scrollable { get; set; }

        public bool? Selectable { get; set; }

        public TreeListSortableSettings<T> Sortable { get; } = new TreeListSortableSettings<T>();

        public List<TreeListToolbar<T>> Toolbar { get; set; } = new List<TreeListToolbar<T>>();


        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            InitializePrefix();

            if (AutoBind.HasValue)
            {
                settings["autoBind"] = AutoBind;
            }

            var columns = Columns.Select(i => i.Serialize());
            if (columns.Any())
            {
                settings["columns"] = columns;
            }

            if (Resizable.HasValue)
            {
                settings["resizable"] = Resizable;
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
            else if (ColumnMenu.Enabled == true)
            {
                settings["columnMenu"] = true;
            }

            var editable = Editable.Serialize();
            if (editable.Any())
            {
                settings["editable"] = editable;
            }
            else if (Editable.Enabled == true)
            {
                settings["editable"] = true;
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
            else if (Filterable.Enabled == true)
            {
                settings["filterable"] = true;
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
            else if (Sortable.Enabled == true)
            {
                settings["sortable"] = true;
            }

            var toolbar = Toolbar.Select(i => i.Serialize());
            if (toolbar.Any())
            {
                settings["toolbar"] = toolbar;
            }

            return settings;
        }

        protected void InitializePrefix()
        {
            
            ColumnMenu.IdPrefix = IdPrefix;
            
            Columns.Each(i => i.IdPrefix = IdPrefix);
            
            Editable.IdPrefix = IdPrefix;
            
            Excel.IdPrefix = IdPrefix;
            
            Filterable.IdPrefix = IdPrefix;
            
            Messages.IdPrefix = IdPrefix;
            
            Pdf.IdPrefix = IdPrefix;
            
            Sortable.IdPrefix = IdPrefix;
            
            Toolbar.Each(i => i.IdPrefix = IdPrefix);
            
        }
    }
}
