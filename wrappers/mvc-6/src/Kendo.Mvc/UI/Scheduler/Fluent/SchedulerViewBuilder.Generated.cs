using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring SchedulerView
    /// </summary>
    public partial class SchedulerViewBuilder<T>
        where T : class, ISchedulerEvent 
    {
        /// <summary>
        /// The template used to render the "all day" scheduler events.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value for AllDayEventTemplate</param>
        public SchedulerViewBuilder<T> AllDayEventTemplate(string value)
        {
            Container.AllDayEventTemplate = value;
            return this;
        }

        /// <summary>
        /// The template used to render the "all day" scheduler events.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The ID of the template element for AllDayEventTemplate</param>
        public SchedulerViewBuilder<T> AllDayEventTemplateId(string templateId)
        {
            Container.AllDayEventTemplateId = templateId;
            return this;
        }

        /// <summary>
        /// If set to true the scheduler will display a slot for "all day" events.
        /// </summary>
        /// <param name="value">The value for AllDaySlot</param>
        public SchedulerViewBuilder<T> AllDaySlot(bool value)
        {
            Container.AllDaySlot = value;
            return this;
        }

        /// <summary>
        /// The template used to render the all day slot cell.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value for AllDaySlotTemplate</param>
        public SchedulerViewBuilder<T> AllDaySlotTemplate(string value)
        {
            Container.AllDaySlotTemplate = value;
            return this;
        }

        /// <summary>
        /// The template used to render the all day slot cell.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The ID of the template element for AllDaySlotTemplate</param>
        public SchedulerViewBuilder<T> AllDaySlotTemplateId(string templateId)
        {
            Container.AllDaySlotTemplateId = templateId;
            return this;
        }

        /// <summary>
        /// The width of the table columns in timeline views. Value is treated as pixels.
        /// </summary>
        /// <param name="value">The value for ColumnWidth</param>
        public SchedulerViewBuilder<T> ColumnWidth(double value)
        {
            Container.ColumnWidth = value;
            return this;
        }

        /// <summary>
        /// The template used to render the date header cells.By default the scheduler renders the date using a custom date format - "ddd M/dd".
		/// The "ddd" specifier, a.k.a abbreviated name of the week day, will be localized using the current Kendo UI culture.
		/// If the developer wants to control the day and month order then one needs to define a custom template.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value for DateHeaderTemplate</param>
        public SchedulerViewBuilder<T> DateHeaderTemplate(string value)
        {
            Container.DateHeaderTemplate = value;
            return this;
        }

        /// <summary>
        /// The template used to render the date header cells.By default the scheduler renders the date using a custom date format - "ddd M/dd".
		/// The "ddd" specifier, a.k.a abbreviated name of the week day, will be localized using the current Kendo UI culture.
		/// If the developer wants to control the day and month order then one needs to define a custom template.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The ID of the template element for DateHeaderTemplate</param>
        public SchedulerViewBuilder<T> DateHeaderTemplateId(string templateId)
        {
            Container.DateHeaderTemplateId = templateId;
            return this;
        }

        /// <summary>
        /// The template used to render the day slots in month view.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value for DayTemplate</param>
        public SchedulerViewBuilder<T> DayTemplate(string value)
        {
            Container.DayTemplate = value;
            return this;
        }

        /// <summary>
        /// The template used to render the day slots in month view.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The ID of the template element for DayTemplate</param>
        public SchedulerViewBuilder<T> DayTemplateId(string templateId)
        {
            Container.DayTemplateId = templateId;
            return this;
        }

        /// <summary>
        /// If set to true the user would be able to create new scheduler events and modify or delete existing ones.Overrides the editable option of the scheduler.
        /// </summary>
        /// <param name="configurator">The configurator for the editable setting.</param>
        public SchedulerViewBuilder<T> Editable(Action<SchedulerViewEditableSettingsBuilder<T>> configurator)
        {
            Container.Editable.Enabled = true;

            Container.Editable.Scheduler = Container.Scheduler;
            configurator(new SchedulerViewEditableSettingsBuilder<T>(Container.Editable));

            return this;
        }

        /// <summary>
        /// If set to true the user would be able to create new scheduler events and modify or delete existing ones.Overrides the editable option of the scheduler.
        /// </summary>
        /// <param name="enabled">Enables or disables the editable option.</param>
        public SchedulerViewBuilder<T> Editable(bool enabled)
        {
            Container.Editable.Enabled = enabled;
            return this;
        }

        /// <summary>
        /// The end time of the view. The scheduler will display events ending before the endTime.
        /// </summary>
        /// <param name="value">The value for EndTime</param>
        public SchedulerViewBuilder<T> EndTime(DateTime value)
        {
            Container.EndTime = value;
            return this;
        }

        /// <summary>
        /// The height of the scheduler event rendered in month and timeline views.
        /// </summary>
        /// <param name="value">The value for EventHeight</param>
        public SchedulerViewBuilder<T> EventHeight(double value)
        {
            Container.EventHeight = value;
            return this;
        }

        /// <summary>
        /// The template used by the view to render the scheduler events.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value for EventTemplate</param>
        public SchedulerViewBuilder<T> EventTemplate(string value)
        {
            Container.EventTemplate = value;
            return this;
        }

        /// <summary>
        /// The template used by the view to render the scheduler events.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The ID of the template element for EventTemplate</param>
        public SchedulerViewBuilder<T> EventTemplateId(string templateId)
        {
            Container.EventTemplateId = templateId;
            return this;
        }

        /// <summary>
        /// The template used by the agenda view to render the time of the scheduler events.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value for EventTimeTemplate</param>
        public SchedulerViewBuilder<T> EventTimeTemplate(string value)
        {
            Container.EventTimeTemplate = value;
            return this;
        }

        /// <summary>
        /// The template used by the agenda view to render the time of the scheduler events.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The ID of the template element for EventTimeTemplate</param>
        public SchedulerViewBuilder<T> EventTimeTemplateId(string templateId)
        {
            Container.EventTimeTemplateId = templateId;
            return this;
        }

        /// <summary>
        /// The configuration of the view resource(s) grouping.
        /// </summary>
        /// <param name="configurator">The configurator for the group setting.</param>
        public SchedulerViewBuilder<T> Group(Action<SchedulerViewGroupSettingsBuilder<T>> configurator)
        {

            Container.Group.Scheduler = Container.Scheduler;
            configurator(new SchedulerViewGroupSettingsBuilder<T>(Container.Group));

            return this;
        }

        /// <summary>
        /// The number of minutes represented by a major tick.
        /// </summary>
        /// <param name="value">The value for MajorTick</param>
        public SchedulerViewBuilder<T> MajorTick(double value)
        {
            Container.MajorTick = value;
            return this;
        }

        /// <summary>
        /// The template used to render the major ticks.By default the scheduler renders the time using the current culture time format.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value for MajorTimeHeaderTemplate</param>
        public SchedulerViewBuilder<T> MajorTimeHeaderTemplate(string value)
        {
            Container.MajorTimeHeaderTemplate = value;
            return this;
        }

        /// <summary>
        /// The template used to render the major ticks.By default the scheduler renders the time using the current culture time format.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The ID of the template element for MajorTimeHeaderTemplate</param>
        public SchedulerViewBuilder<T> MajorTimeHeaderTemplateId(string templateId)
        {
            Container.MajorTimeHeaderTemplateId = templateId;
            return this;
        }

        /// <summary>
        /// The number of time slots to display per major tick.
        /// </summary>
        /// <param name="value">The value for MinorTickCount</param>
        public SchedulerViewBuilder<T> MinorTickCount(double value)
        {
            Container.MinorTickCount = value;
            return this;
        }

        /// <summary>
        /// The template used to render the minor ticks.By default the scheduler renders a "&amp;nbsp;".The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value for MinorTimeHeaderTemplate</param>
        public SchedulerViewBuilder<T> MinorTimeHeaderTemplate(string value)
        {
            Container.MinorTimeHeaderTemplate = value;
            return this;
        }

        /// <summary>
        /// The template used to render the minor ticks.By default the scheduler renders a "&amp;nbsp;".The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The ID of the template element for MinorTimeHeaderTemplate</param>
        public SchedulerViewBuilder<T> MinorTimeHeaderTemplateId(string templateId)
        {
            Container.MinorTimeHeaderTemplateId = templateId;
            return this;
        }

        /// <summary>
        /// If set to true the view will be initially selected by the scheduler widget.
        /// </summary>
        /// <param name="value">The value for Selected</param>
        public SchedulerViewBuilder<T> Selected(bool value)
        {
            Container.Selected = value;
            return this;
        }

        /// <summary>
        /// If set to true the view will be initially selected by the scheduler widget.
        /// </summary>
        public SchedulerViewBuilder<T> Selected()
        {
            Container.Selected = true;
            return this;
        }

        /// <summary>
        /// The format used to display the selected date. Uses kendo.format.Contains two placeholders - "{0}" and "{1}" which represent the start and end date displayed by the view.
        /// </summary>
        /// <param name="value">The value for SelectedDateFormat</param>
        public SchedulerViewBuilder<T> SelectedDateFormat(string value)
        {
            Container.SelectedDateFormat = value;
            return this;
        }

        /// <summary>
        /// If set to true the view will be initially shown in business hours mode. By default view is displayed in full day mode.
        /// </summary>
        /// <param name="value">The value for ShowWorkHours</param>
        public SchedulerViewBuilder<T> ShowWorkHours(bool value)
        {
            Container.ShowWorkHours = value;
            return this;
        }

        /// <summary>
        /// If set to true the view will be initially shown in business hours mode. By default view is displayed in full day mode.
        /// </summary>
        public SchedulerViewBuilder<T> ShowWorkHours()
        {
            Container.ShowWorkHours = true;
            return this;
        }

        /// <summary>
        /// The template used to render the time slot cells.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The value for SlotTemplate</param>
        public SchedulerViewBuilder<T> SlotTemplate(string value)
        {
            Container.SlotTemplate = value;
            return this;
        }

        /// <summary>
        /// The template used to render the time slot cells.The fields which can be used in the template are:
        /// </summary>
        /// <param name="value">The ID of the template element for SlotTemplate</param>
        public SchedulerViewBuilder<T> SlotTemplateId(string templateId)
        {
            Container.SlotTemplateId = templateId;
            return this;
        }

        /// <summary>
        /// The start time of the view. The scheduler will display events starting after the startTime.
        /// </summary>
        /// <param name="value">The value for StartTime</param>
        public SchedulerViewBuilder<T> StartTime(DateTime value)
        {
            Container.StartTime = value;
            return this;
        }

        /// <summary>
        /// The user-friendly title of the view displayed by the scheduler.
        /// </summary>
        /// <param name="value">The value for Title</param>
        public SchedulerViewBuilder<T> Title(string value)
        {
            Container.Title = value;
            return this;
        }

        /// <summary>
        /// The type of the view. The built-in views are: "day", "week", "workWeek", "month", "agenda", "timeline", "timelineWeek", "timelineWorkWeek" and "timelineMonth".
        /// </summary>
        /// <param name="value">The value for Type</param>
        public SchedulerViewBuilder<T> Type(string value)
        {
            Container.Type = value;
            return this;
        }

        /// <summary>
        /// The start of working week (index based).
        /// </summary>
        /// <param name="value">The value for WorkWeekStart</param>
        public SchedulerViewBuilder<T> WorkWeekStart(double value)
        {
            Container.WorkWeekStart = value;
            return this;
        }

        /// <summary>
        /// The end of working week (index based).
        /// </summary>
        /// <param name="value">The value for WorkWeekEnd</param>
        public SchedulerViewBuilder<T> WorkWeekEnd(double value)
        {
            Container.WorkWeekEnd = value;
            return this;
        }

    }
}
