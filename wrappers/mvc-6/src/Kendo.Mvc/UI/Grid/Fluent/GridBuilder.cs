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
        /// If set to <c>false</c> the widget will not bind to the data source during initialization; the default value is <c>true</c>.
        /// Setting AutoBind to <c>false</c> is supported in ajax-bound mode.
        /// </summary>
        /// <param name="value">If true the grid will be automatically data bound, otherwise false</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .AutoBind(false)
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>        
        /// </example>
        public GridBuilder<T> AutoBind(bool value)
        {
            Component.AutoBind = value;
            return this;
        }

        /// <summary>
        /// Sets the width of the column resize handle. Apply a larger value for easier grasping.
        /// </summary>
        /// <param name="width">width in pixels</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name("Grid")
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///          .Ajax()
        ///          .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        ///    .ColumnResizeHandleWidth(8)
        /// )
        /// </code>  
        /// </example>
        public GridBuilder<T> ColumnResizeHandleWidth(int width)
        {
            Component.ColumnResizeHandleWidth = width;

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

        /// <summary>
        /// Enables grid column sorting.
        /// </summary>
        /// <example>   
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Sortable()
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Sortable()
        {
            Component.Sortable.Enabled = true;

            return this;
        }

        /// <summary>
        /// Sets the sorting configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the sorting</param>
        /// <example>  
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Sortable(sorting =&gt; sorting.SortMode(GridSortMode.MultipleColumn))
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Sortable(Action<GridSortSettingsBuilder<T>> configurator)
        {
            Component.Sortable.Enabled = true;

            configurator(new GridSortSettingsBuilder<T>(Component.Sortable));

            return this;
        }

        /// <summary>
        /// Enables grid keyboard navigation.
        /// </summary>
        /// <example>    
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Navigatable()
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Navigatable()
        {
            Component.Navigatable.Enabled = true;

            return this;
        }

        /// <summary>
        /// Sets the keyboard navigation configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the keyboard navigation</param>
        /// <example>        
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Navigatable(navigation =&gt; navigation.Enabled(true))
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Navigatable(Action<GridNavigatableSettingsBuilder> configurator)
        {
            Navigatable();

            configurator(new GridNavigatableSettingsBuilder(Component.Navigatable));

            return this;
        }

        /// <summary>
        /// Enables grid filtering.
        /// </summary>
        /// <example>        
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Filterable()
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Filterable()
        {
            Component.Filterable.Enabled = true;
            return this;
        }

        /// <summary>
        /// Sets the filtering configuration of the grid.
        /// </summary>
        /// <param name="configurator">The lambda which configures the filtering</param>
        /// <example>     
        ///<code lang="Razor">
        /// @(Html.Kendo().Grid&lt;Product&gt;()
        ///     .Name(&quot;grid&quot;)
        ///     .Filterable(filtering =&gt; filtering.Enabled(true))
        ///     .DataSource(dataSource =&gt;
        ///         // configure the data source
        ///         dataSource
        ///             .Ajax()
        ///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
        ///     )
        /// )
        /// </code>
        /// </example>
        public GridBuilder<T> Filterable(Action<GridFilterableSettingsBuilder> configurator)
        {
            Component.Filterable.Enabled = true;

            configurator(new GridFilterableSettingsBuilder(Component.Filterable));

            return this;
        }
    }
}