using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI Gantt
    /// </summary>
    public partial class GanttBuilder<TTaskModel, TDependenciesModel>: WidgetBuilderBase<Gantt<TTaskModel, TDependenciesModel>, GanttBuilder<TTaskModel, TDependenciesModel>>
        where TTaskModel : class, IGanttTask  where TDependenciesModel : class, IGanttDependency 
    {
        public GanttBuilder(Gantt<TTaskModel, TDependenciesModel> component) : base(component)
        {
        }

        /// <summary>
        /// Configures the DataSource options.
        /// </summary>
        /// <param name="configurator">The DataSource configurator action.</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Gantt&lt;TaskViewModel, DependencyViewModel&gt;()
        ///     .Name("Gantt")
        ///     .DataSource(source =&gt;
        ///     {
        ///         source.Read(read =&gt;
        ///         {
        ///             read.Action("Read", "Gantt");
        ///         });
        ///     })
        /// )
        /// </code>
        /// </example>
        public GanttBuilder<TTaskModel, TDependenciesModel>  DataSource(Action<GanttDataSourceBuilder<TTaskModel>> configurator)
        {
            configurator(new GanttDataSourceBuilder<TTaskModel>(Component.DataSource, Component.ViewContext, Component.UrlGenerator));

            return this;
        }

        /// <summary>
        /// Configures the dependencies DataSource options.
        /// </summary>
        /// <param name="configurator">The DataSource configurator action.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Gantt&lt;TaskViewModel, DependencyViewModel&gt;()
        ///     .Name("Gantt")
        ///     .DataSource(source =&gt;
        ///     {
        ///         source.Read(read =&gt;
        ///         {
        ///             read.Action("Read", "Gantt");
        ///         });
        ///     })
        ///     .DependenciesDataSource(source =&gt;
        ///     {
        ///         source.Read(read =&gt;
        ///         {
        ///             read.Action("Read", "Gantt");
        ///         });
        ///     })
        ///  )
        /// </code>
        /// </example>
        public GanttBuilder<TTaskModel, TDependenciesModel> DependenciesDataSource(Action<GanttDependenciesDataSourceBuilder<TDependenciesModel>> configurator)
        {
            configurator(new GanttDependenciesDataSourceBuilder<TDependenciesModel>(Component.DependenciesDataSource, Component.ViewContext, Component.UrlGenerator));

            return this;
        }
    }
}

