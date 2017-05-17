namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;
    using System;

    /// <summary>
    /// Defines the fluent API for adding views to Gantt for ASP.NET MVC
    /// </summary>
    public class GanttViewFactory : IHideObjectMembers
    {
        private readonly List<GanttView> container;

        /// <summary>
        /// Initializes a new instance of the <see cref="List<GanttView>"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        public GanttViewFactory(List<GanttView> container)
        {
            this.container = container;
        }

        /// <summary>
        /// Defines a view 
        /// </summary>
        /// <param name="type">The GanttView type for the view. Supported types are "day", "week", "month" and "year". </param>
        private GanttViewBuilder Add(GanttViewType type)
        {
            var view = new GanttView { Type = type };

            container.Add(view);

            return new GanttViewBuilder(view);
        }

        /// <summary>
        /// Defines a Gantt day view 
        /// </summary>
        public virtual GanttViewBuilder DayView(Action<GanttViewBuilder> addViewAction)
        {
            var builder = Add(GanttViewType.Day);

            addViewAction(builder);

            return builder;
        }

        /// <summary>
        /// Enables a Gantt day view
        /// </summary>
        public void DayView()
        {
            Add(GanttViewType.Day);
        }

        /// <summary>
        /// Defines a Gantt week view.
        /// </summary>
        public virtual GanttViewBuilder WeekView(Action<GanttViewBuilder> addViewAction)
        {
            var builder = Add(GanttViewType.Week);

            addViewAction(builder);

            return builder;
        }
        
        /// <summary>
        /// Enables a Gantt week view
        /// </summary>
        public void WeekView()
        {
            Add(GanttViewType.Week);
        }

        /// <summary>
        /// Defines a Gantt мonth view
        /// </summary>
        public virtual GanttViewBuilder MonthView(Action<GanttViewBuilder> addViewAction)
        {
            var builder = Add(GanttViewType.Month);

            addViewAction(builder);

            return builder;
        }

        /// <summary>
        /// Enables a month day view
        /// </summary>
        public void MonthView()
        {
            Add(GanttViewType.Month);
        }

        /// <summary>
        /// Defines a Scheduler year view.
        /// </summary>
        public virtual GanttViewBuilder YearView(Action<GanttViewBuilder> addViewAction)
        {
            var builder = Add(GanttViewType.Year);

            addViewAction(builder);

            return builder;
        }

        /// <summary>
        /// Enables a year view
        /// </summary>
        public void YearView()
        {
            Add(GanttViewType.Year);
        }
    }
}

