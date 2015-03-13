using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI Grid component
    /// </summary>
    public partial class Grid<T> where T : class 
    {
        public GridAllowCopySettings<T> AllowCopy { get; } = new GridAllowCopySettings<T>();

        public bool? AutoBind { get; set; }

        public double? ColumnResizeHandleWidth { get; set; }

        public GridColumnMenuSettings<T> ColumnMenu { get; } = new GridColumnMenuSettings<T>();

        public GridExcelSettings<T> Excel { get; } = new GridExcelSettings<T>();

        public GridGroupableSettings<T> Groupable { get; } = new GridGroupableSettings<T>();

        public bool? Navigatable { get; set; }

        public GridPdfSettings<T> Pdf { get; } = new GridPdfSettings<T>();

        public GridSortableSettings<T> Sortable { get; } = new GridSortableSettings<T>();


        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            var allowCopy = AllowCopy.Serialize();
            if (allowCopy.Any())
            {
                settings["allowCopy"] = allowCopy;
            }
            else if (AllowCopy.Enabled == true)
            {
                settings["allowCopy"] = true;
            }

            if (AutoBind.HasValue)
            {
                settings["autoBind"] = AutoBind;
            }

            if (ColumnResizeHandleWidth.HasValue)
            {
                settings["columnResizeHandleWidth"] = ColumnResizeHandleWidth;
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

            var excel = Excel.Serialize();
            if (excel.Any())
            {
                settings["excel"] = excel;
            }

            var groupable = Groupable.Serialize();
            if (groupable.Any())
            {
                settings["groupable"] = groupable;
            }
            else if (Groupable.Enabled == true)
            {
                settings["groupable"] = true;
            }

            if (Navigatable.HasValue)
            {
                settings["navigatable"] = Navigatable;
            }

            var pdf = Pdf.Serialize();
            if (pdf.Any())
            {
                settings["pdf"] = pdf;
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

            return settings;
        }
    }
}
