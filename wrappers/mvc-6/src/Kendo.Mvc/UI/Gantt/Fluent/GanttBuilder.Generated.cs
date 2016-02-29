using System;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI Gantt
    /// </summary>
    public partial class GanttBuilder<TTaskModel, TDependenciesModel>
        where TTaskModel : class, IGanttTask  where TDependenciesModel : class, IGanttDependency 
    {
        /// <summary>
        /// If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the
		/// data source is fired. By default the widget will bind to the data source specified in the configuration.
        /// </summary>
        /// <param name="value">The value for AutoBind</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> AutoBind(bool value)
        {
            Container.AutoBind = value;
            return this;
        }

        /// <summary>
        /// Defines the width of the column resize handle in pixels. Apply a larger value for easier grasping.
        /// </summary>
        /// <param name="value">The value for ColumnResizeHandleWidth</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> ColumnResizeHandleWidth(double value)
        {
            Container.ColumnResizeHandleWidth = value;
            return this;
        }

        /// <summary>
        /// If set to true the user could navigate the widget using the keyboard. By default keyboard navigation is disabled.
        /// </summary>
        /// <param name="value">The value for Navigatable</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> Navigatable(bool value)
        {
            Container.Navigatable = value;
            return this;
        }

        /// <summary>
        /// If set to true the user could navigate the widget using the keyboard. By default keyboard navigation is disabled.
        /// </summary>
        public GanttBuilder<TTaskModel, TDependenciesModel> Navigatable()
        {
            Container.Navigatable = true;
            return this;
        }

        /// <summary>
        /// Sets the start of the work day.
        /// </summary>
        /// <param name="value">The value for WorkDayStart</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> WorkDayStart(DateTime value)
        {
            Container.WorkDayStart = value;
            return this;
        }

        /// <summary>
        /// Sets the end of the work day.
        /// </summary>
        /// <param name="value">The value for WorkDayEnd</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> WorkDayEnd(DateTime value)
        {
            Container.WorkDayEnd = value;
            return this;
        }

        /// <summary>
        /// The start of working week (index based).
        /// </summary>
        /// <param name="value">The value for WorkWeekStart</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> WorkWeekStart(double value)
        {
            Container.WorkWeekStart = value;
            return this;
        }

        /// <summary>
        /// The end of working week (index based).
        /// </summary>
        /// <param name="value">The value for WorkWeekEnd</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> WorkWeekEnd(double value)
        {
            Container.WorkWeekEnd = value;
            return this;
        }

        /// <summary>
        /// The span of an hour slot.
        /// </summary>
        /// <param name="value">The value for HourSpan</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> HourSpan(double value)
        {
            Container.HourSpan = value;
            return this;
        }

        /// <summary>
        /// If set to true the Gantt will snap tasks to the nearest slot during dragging (resizing or moving). Set it to false to allow free moving and resizing of tasks.
        /// </summary>
        /// <param name="value">The value for Snap</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> Snap(bool value)
        {
            Container.Snap = value;
            return this;
        }

        /// <summary>
        /// The height of the widget. Numeric values are treated as pixels.
        /// </summary>
        /// <param name="value">The value for Height</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> Height(double value)
        {
            Container.Height = value;
            return this;
        }

        /// <summary>
        /// The width of the task list. Numeric values are treated as pixels.
        /// </summary>
        /// <param name="value">The value for ListWidth</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> ListWidth(string value)
        {
            Container.ListWidth = value;
            return this;
        }

        /// <summary>
        /// If set to true allows users to resize columns by dragging their header borders. By default resizing is disabled.
        /// </summary>
        /// <param name="value">The value for Resizable</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> Resizable(bool value)
        {
            Container.Resizable = value;
            return this;
        }

        /// <summary>
        /// If set to true allows users to resize columns by dragging their header borders. By default resizing is disabled.
        /// </summary>
        public GanttBuilder<TTaskModel, TDependenciesModel> Resizable()
        {
            Container.Resizable = true;
            return this;
        }

        /// <summary>
        /// If set to false the user won't be able to select tasks in the Gantt. By default selection is enabled and triggers the change event.
        /// </summary>
        /// <param name="value">The value for Selectable</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> Selectable(bool value)
        {
            Container.Selectable = value;
            return this;
        }

        /// <summary>
        /// If set to false, Gantt views will show all days of the week. By default the views display only business days.
        /// </summary>
        /// <param name="value">The value for ShowWorkDays</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> ShowWorkDays(bool value)
        {
            Container.ShowWorkDays = value;
            return this;
        }

        /// <summary>
        /// If set to false, the day view will show all hours of the day. By default the view displays only business hours.
        /// </summary>
        /// <param name="value">The value for ShowWorkHours</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> ShowWorkHours(bool value)
        {
            Container.ShowWorkHours = value;
            return this;
        }

        /// <summary>
        /// The template used to render the gantt tasks.The fields which can be used in the template are the task fields
        /// </summary>
        /// <param name="value">The value for TaskTemplate</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> TaskTemplate(string value)
        {
            Container.TaskTemplate = value;
            return this;
        }

        /// <summary>
        /// The template used to render the gantt tasks.The fields which can be used in the template are the task fields
        /// </summary>
        /// <param name="value">The ID of the template element for TaskTemplate</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> TaskTemplateId(string templateId)
        {
            Container.TaskTemplateId = templateId;
            return this;
        }

        /// <summary>
        /// The height of the table rows. Numeric values are treated as pixels.
        /// </summary>
        /// <param name="value">The value for RowHeight</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> RowHeight(double value)
        {
            Container.RowHeight = value;
            return this;
        }


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        /// @(Html.Kendo().Gantt()
        ///       .Name("Gantt")
        ///       .Events(events => events
        ///           .DataBinding("onDataBinding")
        ///       )
        /// )
        /// </code>
        /// </example>
        public GanttBuilder<TTaskModel, TDependenciesModel> Events(Action<GanttEventBuilder> configurator)
        {
            configurator(new GanttEventBuilder(Container.Events));
            return this;
        }
        
    }
}

