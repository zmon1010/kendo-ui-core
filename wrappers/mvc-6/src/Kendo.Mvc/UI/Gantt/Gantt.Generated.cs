using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI Gantt component
    /// </summary>
    public partial class Gantt<TTaskModel, TDependenciesModel> where TTaskModel : class, IGanttTask  where TDependenciesModel : class, IGanttDependency 
    {
        public bool? AutoBind { get; set; }

        public double? ColumnResizeHandleWidth { get; set; }

        public bool? Navigatable { get; set; }

        public DateTime? WorkDayStart { get; set; }

        public DateTime? WorkDayEnd { get; set; }

        public double? WorkWeekStart { get; set; }

        public double? WorkWeekEnd { get; set; }

        public double? HourSpan { get; set; }

        public bool? Snap { get; set; }

        public double? Height { get; set; }

        public string ListWidth { get; set; }

        public bool? Resizable { get; set; }

        public bool? Selectable { get; set; }

        public bool? ShowWorkDays { get; set; }

        public bool? ShowWorkHours { get; set; }

        public string TaskTemplate { get; set; }

        public string TaskTemplateId { get; set; }

        public GanttTooltipSettings<TTaskModel, TDependenciesModel> Tooltip { get; } = new GanttTooltipSettings<TTaskModel, TDependenciesModel>();

        public double? RowHeight { get; set; }


        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            if (AutoBind.HasValue)
            {
                settings["autoBind"] = AutoBind;
            }

            if (ColumnResizeHandleWidth.HasValue)
            {
                settings["columnResizeHandleWidth"] = ColumnResizeHandleWidth;
            }

            if (Navigatable.HasValue)
            {
                settings["navigatable"] = Navigatable;
            }

            if (WorkDayStart.HasValue)
            {
                settings["workDayStart"] = WorkDayStart;
            }

            if (WorkDayEnd.HasValue)
            {
                settings["workDayEnd"] = WorkDayEnd;
            }

            if (WorkWeekStart.HasValue)
            {
                settings["workWeekStart"] = WorkWeekStart;
            }

            if (WorkWeekEnd.HasValue)
            {
                settings["workWeekEnd"] = WorkWeekEnd;
            }

            if (HourSpan.HasValue)
            {
                settings["hourSpan"] = HourSpan;
            }

            if (Snap.HasValue)
            {
                settings["snap"] = Snap;
            }

            if (Height.HasValue)
            {
                settings["height"] = Height;
            }

            if (ListWidth?.HasValue() == true)
            {
                settings["listWidth"] = ListWidth;
            }

            if (Resizable.HasValue)
            {
                settings["resizable"] = Resizable;
            }

            if (Selectable.HasValue)
            {
                settings["selectable"] = Selectable;
            }

            if (ShowWorkDays.HasValue)
            {
                settings["showWorkDays"] = ShowWorkDays;
            }

            if (ShowWorkHours.HasValue)
            {
                settings["showWorkHours"] = ShowWorkHours;
            }

            if (TaskTemplateId.HasValue())
            {
                settings["taskTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('{0}{1}').html()", IdPrefix, TaskTemplateId
                    )
                };
            }
            else if (TaskTemplate.HasValue())
            {
                settings["taskTemplate"] = TaskTemplate;
            }

            var tooltip = Tooltip.Serialize();
            if (tooltip.Any())
            {
                settings["tooltip"] = tooltip;
            }

            if (RowHeight.HasValue)
            {
                settings["rowHeight"] = RowHeight;
            }

            return settings;
        }
    }
}
