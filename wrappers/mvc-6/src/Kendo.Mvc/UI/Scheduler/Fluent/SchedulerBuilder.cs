using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI Scheduler
    /// </summary>
    public partial class SchedulerBuilder<T>: WidgetBuilderBase<Scheduler<T>, SchedulerBuilder<T>>
        where T : class, ISchedulerEvent 
    {
        public SchedulerBuilder(Scheduler<T> component) : base(component)
        {
        }

        /// <summary>
        /// The start time of the week and day views. The scheduler will display events starting after the startTime.
        /// </summary>
        /// <param name="hours">The hours</param>
        /// <param name="minutes">The minutes</param>
        /// <param name="seconds">The seconds</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Screening&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .StartTime(10, 0, 0)
        ///     .BindTo(Model)
        /// )
        /// </code>
        /// </example>

        public SchedulerBuilder<T> StartTime(int hours, int minutes, int seconds)
        {
            var today = DateTime.Today;

            Container.StartTime = new DateTime(today.Year, today.Month, today.Day, hours, minutes, seconds);

            return this;
        }

        /// <summary>
        /// The end time of the week and day views. The scheduler will display events ending before the endTime.
        /// </summary>
        /// <param name="hours">The hours</param>
        /// <param name="minutes">The minutes</param>
        /// <param name="seconds">The seconds</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Screening&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .EndTime(10,0,0)
        ///     .BindTo(Model)
        /// )
        /// </code>
        /// </example>
        public SchedulerBuilder<T> EndTime(int hours, int minutes, int seconds)
        {
            var today = DateTime.Today;

            Container.EndTime = new DateTime(today.Year, today.Month, today.Day, hours, minutes, seconds);

            return this;
        }

        /// <summary>
        /// Sets the start of the work day when the  "Show business hours" button is clicked.
        /// </summary>
        /// <param name="hours">The hours</param>
        /// <param name="minutes">The minutes</param>
        /// <param name="seconds">The seconds</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Screening&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .WorkDayStart(10, 0, 0)
        ///     .BindTo(Model)
        /// )
        /// </code>
        /// </example>
        public SchedulerBuilder<T> WorkDayStart(int hours, int minutes, int seconds)
        {
            var today = DateTime.Today;

            Component.WorkDayStart = new DateTime(today.Year, today.Month, today.Day, hours, minutes, seconds);

            return this;
        }

        /// <summary>
        /// Sets the end of the work day when the  "Show business hours" button is clicked.
        /// </summary>
        /// <param name="hours">The hours</param>
        /// <param name="minutes">The minutes</param>
        /// <param name="seconds">The seconds</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Screening&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .WorkDayEnd(16,0,0)
        ///     .BindTo(Model)
        /// )
        /// </code>
        /// </example>
        public SchedulerBuilder<T> WorkDayEnd(int hours, int minutes, int seconds)
        {
            var today = DateTime.Today;

            Component.WorkDayEnd = new DateTime(today.Year, today.Month, today.Day, hours, minutes, seconds);

            return this;
        }

        /// <summary>
        /// Binds the scheduler to a list of objects
        /// </summary>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="ASPX">
        /// @model IEnumerable&lt;Task&gt;
        /// &lt;%@Page Inherits=&quot;System.Web.Mvc.ViewPage&lt;IEnumerable&lt;Task&gt;&gt;&quot; %&gt;
        /// &lt;: Html.Kendo().Scheduler&lt;Task&gt;()
        ///    .Name(&quot;Scheduler&quot;)
        ///    .BindTo(Model)
        ///    .DataSource(dataSource =&gt; dataSource
        ///        .Model(m =&gt; m.Id(f =&gt; f.TaskID))
        ///    )&gt;
        /// </code>
        /// <code lang="Razor">
        /// @model IEnumerable&lt;Task&gt;
        /// @(Html.Kendo().Scheduler&lt;Task&gt;()
        ///    .Name(&quot;Scheduler&quot;)
        ///    .BindTo(Model)
        ///    .DataSource(dataSource => dataSource
        ///        .Model(m => m.Id(f => f.TaskID))
        ///    ))
        /// </code>
        /// </example>
        public SchedulerBuilder<T> BindTo(IEnumerable<T> dataSource)
        {
            Component.DataSource.Data = dataSource;

            return this;
        }

        /// <summary>
        /// Configures the DataSource options.
        /// </summary>
        /// <param name="configurator">The DataSource configurator action.</param>
        /// <example>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Scheduler&lt;Task&gt;()
        ///             .Name("Scheduler")
        ///             .DataSource(source =&gt;
        ///             {
        ///                 source.Read(read =&gt;
        ///                 {
        ///                     read.Action("Read", "Scheduler");
        ///                 });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        /// 
        public SchedulerBuilder<T> DataSource(Action<SchedulerAjaxDataSourceBuilder<T>> configurator)
        {
            configurator(new SchedulerAjaxDataSourceBuilder<T>(Component.DataSource, this.Component.ViewContext, this.Component.UrlGenerator));

            return this;
        }
    }
}

