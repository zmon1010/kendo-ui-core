using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI SchedulerView class
    /// </summary>
    public partial class SchedulerView<T> where T : class, ISchedulerEvent 
    {
        public string AllDayEventTemplate { get; set; }

        public string AllDayEventTemplateId { get; set; }

        public bool? AllDaySlot { get; set; }

        public string AllDaySlotTemplate { get; set; }

        public string AllDaySlotTemplateId { get; set; }

        public double? ColumnWidth { get; set; }

        public string DateHeaderTemplate { get; set; }

        public string DateHeaderTemplateId { get; set; }

        public string DayTemplate { get; set; }

        public string DayTemplateId { get; set; }

        public SchedulerViewEditableSettings<T> Editable { get; } = new SchedulerViewEditableSettings<T>();

        public DateTime? EndTime { get; set; }

        public double? EventHeight { get; set; }

        public string EventTemplate { get; set; }

        public string EventTemplateId { get; set; }

        public string EventTimeTemplate { get; set; }

        public string EventTimeTemplateId { get; set; }

        public SchedulerViewGroupSettings<T> Group { get; } = new SchedulerViewGroupSettings<T>();

        public double? MajorTick { get; set; }

        public string MajorTimeHeaderTemplate { get; set; }

        public string MajorTimeHeaderTemplateId { get; set; }

        public double? MinorTickCount { get; set; }

        public string MinorTimeHeaderTemplate { get; set; }

        public string MinorTimeHeaderTemplateId { get; set; }

        public bool? Selected { get; set; }

        public string SelectedDateFormat { get; set; }

        public bool? ShowWorkHours { get; set; }

        public string SlotTemplate { get; set; }

        public string SlotTemplateId { get; set; }

        public DateTime? StartTime { get; set; }

        public string Title { get; set; }

        public string Type { get; set; }

        public double? WorkWeekStart { get; set; }

        public double? WorkWeekEnd { get; set; }


        public Scheduler<T> Scheduler { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (AllDayEventTemplateId.HasValue())
            {
                settings["allDayEventTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('{0}{1}').html()", Scheduler.IdPrefix, AllDayEventTemplateId
                    )
                };
            }
            else if (AllDayEventTemplate.HasValue())
            {
                settings["allDayEventTemplate"] = AllDayEventTemplate;
            }

            if (AllDaySlot.HasValue)
            {
                settings["allDaySlot"] = AllDaySlot;
            }

            if (AllDaySlotTemplateId.HasValue())
            {
                settings["allDaySlotTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('{0}{1}').html()", Scheduler.IdPrefix, AllDaySlotTemplateId
                    )
                };
            }
            else if (AllDaySlotTemplate.HasValue())
            {
                settings["allDaySlotTemplate"] = AllDaySlotTemplate;
            }

            if (ColumnWidth.HasValue)
            {
                settings["columnWidth"] = ColumnWidth;
            }

            if (DateHeaderTemplateId.HasValue())
            {
                settings["dateHeaderTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('{0}{1}').html()", Scheduler.IdPrefix, DateHeaderTemplateId
                    )
                };
            }
            else if (DateHeaderTemplate.HasValue())
            {
                settings["dateHeaderTemplate"] = DateHeaderTemplate;
            }

            if (DayTemplateId.HasValue())
            {
                settings["dayTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('{0}{1}').html()", Scheduler.IdPrefix, DayTemplateId
                    )
                };
            }
            else if (DayTemplate.HasValue())
            {
                settings["dayTemplate"] = DayTemplate;
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

            if (EndTime.HasValue)
            {
                settings["endTime"] = EndTime;
            }

            if (EventHeight.HasValue)
            {
                settings["eventHeight"] = EventHeight;
            }

            if (EventTemplateId.HasValue())
            {
                settings["eventTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('{0}{1}').html()", Scheduler.IdPrefix, EventTemplateId
                    )
                };
            }
            else if (EventTemplate.HasValue())
            {
                settings["eventTemplate"] = EventTemplate;
            }

            if (EventTimeTemplateId.HasValue())
            {
                settings["eventTimeTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('{0}{1}').html()", Scheduler.IdPrefix, EventTimeTemplateId
                    )
                };
            }
            else if (EventTimeTemplate.HasValue())
            {
                settings["eventTimeTemplate"] = EventTimeTemplate;
            }

            var group = Group.Serialize();
            if (group.Any())
            {
                settings["group"] = group;
            }

            if (MajorTick.HasValue)
            {
                settings["majorTick"] = MajorTick;
            }

            if (MajorTimeHeaderTemplateId.HasValue())
            {
                settings["majorTimeHeaderTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('{0}{1}').html()", Scheduler.IdPrefix, MajorTimeHeaderTemplateId
                    )
                };
            }
            else if (MajorTimeHeaderTemplate.HasValue())
            {
                settings["majorTimeHeaderTemplate"] = MajorTimeHeaderTemplate;
            }

            if (MinorTickCount.HasValue)
            {
                settings["minorTickCount"] = MinorTickCount;
            }

            if (MinorTimeHeaderTemplateId.HasValue())
            {
                settings["minorTimeHeaderTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('{0}{1}').html()", Scheduler.IdPrefix, MinorTimeHeaderTemplateId
                    )
                };
            }
            else if (MinorTimeHeaderTemplate.HasValue())
            {
                settings["minorTimeHeaderTemplate"] = MinorTimeHeaderTemplate;
            }

            if (Selected.HasValue)
            {
                settings["selected"] = Selected;
            }

            if (SelectedDateFormat?.HasValue() == true)
            {
                settings["selectedDateFormat"] = SelectedDateFormat;
            }

            if (ShowWorkHours.HasValue)
            {
                settings["showWorkHours"] = ShowWorkHours;
            }

            if (SlotTemplateId.HasValue())
            {
                settings["slotTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('{0}{1}').html()", Scheduler.IdPrefix, SlotTemplateId
                    )
                };
            }
            else if (SlotTemplate.HasValue())
            {
                settings["slotTemplate"] = SlotTemplate;
            }

            if (StartTime.HasValue)
            {
                settings["startTime"] = StartTime;
            }

            if (Title?.HasValue() == true)
            {
                settings["title"] = Title;
            }

            if (Type?.HasValue() == true)
            {
                settings["type"] = Type;
            }

            if (WorkWeekStart.HasValue)
            {
                settings["workWeekStart"] = WorkWeekStart;
            }

            if (WorkWeekEnd.HasValue)
            {
                settings["workWeekEnd"] = WorkWeekEnd;
            }

            return settings;
        }
    }
}
