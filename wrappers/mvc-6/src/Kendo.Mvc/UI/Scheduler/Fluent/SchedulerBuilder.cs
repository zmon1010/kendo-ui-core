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

