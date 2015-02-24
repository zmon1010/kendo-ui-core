using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// The fluent API for configuring Kendo UI Grid for ASP.NET MVC.
    /// </summary>
    public class GridBuilder<T> : WidgetBuilderBase<Grid<T>, GridBuilder<T>>
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GridBuilder{T}"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public GridBuilder(Grid<T> component)
            : base(component)
        {
        }

        public GridBuilder<T> TableHtmlAttributes(object attributes)
        {
            return TableHtmlAttributes(attributes.ToDictionary());
        }

        public GridBuilder<T> TableHtmlAttributes(IDictionary<string, object> attributes)
        {

            Component.TableHtmlAttributes.Clear();
            Component.TableHtmlAttributes.Merge(attributes);

            return this;
        }

        /// <summary>
        /// Sets the data source configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the data source</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>        
        /// </example>
        public GridBuilder<T> DataSource(Action<DataSourceBuilder<T>> configurator)
        {
            configurator(new DataSourceBuilder<T>(Component.DataSource, Component.ViewContext, Component.UrlGenerator));

            return this;
        }

        /// <summary>
        /// Enables grid paging.
        /// </summary>
        /// <example>  
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Pageable()
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Pageable()
        {
            return Pageable(delegate { });
        }

        /// <summary>
        /// Sets the paging configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the paging</param>
        /// <example>
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Pageable(paging =>
        ///         paging.Refresh(true)
        ///     )
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Pageable(Action<PageableBuilder> configurator)
        {
            Component.Pageable.Enabled = true;

            configurator(new PageableBuilder(Component.Pageable));

            return this;
        }
    }
}