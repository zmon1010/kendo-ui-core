using System;

namespace Kendo.Mvc.UI.Fluent
{
	/// <summary>
	/// The fluent API for configuring Kendo UI Grid for ASP.NET MVC.
	/// </summary>
	public partial class GridBuilder<T> : WidgetBuilderBase<Grid<T>, GridBuilder<T>>
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

		/// <summary>
		/// Enables the grid column menu.
		/// </summary>
		/// <example>        
		///<code lang="Razor">
		/// @(Html.Kendo().Grid&lt;Product&gt;()
		///     .Name(&quot;grid&quot;)
		///     .DataSource(dataSource =&gt;
		///         // configure the data source
		///         dataSource
		///             .Ajax()
		///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
		///     )
		///     .ColumnMenu()
		/// )
		/// </code>
		/// </example>
		public GridBuilder<T> ColumnMenu()
		{
			Component.ColumnMenu.Enabled = true;
			return this;
		}

		/// <summary>
		/// Sets the column menu configuration of the grid.
		/// </summary>
		/// <param name="configurator">The lambda which configures the column menu</param>
		/// <example>       
		///<code lang="Razor">
		/// @(Html.Kendo().Grid&lt;Product&gt;()
		///     .Name(&quot;grid&quot;)
		///     .DataSource(dataSource =&gt;
		///         // configure the data source
		///         dataSource
		///             .Ajax()
		///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
		///     )
		///     .ColumnMenu(columnMenu =&gt; columnMenu.Enabled(true))
		/// )
		/// </code>
		/// </example>
		public GridBuilder<T> ColumnMenu(Action<GridColumnMenuSettingsBuilder> configurator)
		{
			Component.ColumnMenu.Enabled = true;

			configurator(new GridColumnMenuSettingsBuilder(Component.ColumnMenu));

			return this;
		}

		/// <summary>
		/// Sets the grouping configuration of the grid.
		/// </summary>
		/// <param name="configurator">The lambda which configures the grouping</param>
		/// <example>  
		///<code lang="Razor">
		/// @(Html.Kendo().Grid&lt;Product&gt;()
		///     .Name(&quot;grid&quot;)
		///     .Groupable(grouping =&gt; grouping.Enabled(true))
		///     .DataSource(dataSource =&gt;
		///         // configure the data source
		///         dataSource
		///             .Ajax()
		///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
		///     )
		/// )
		/// </code>
		/// </example>
		public GridBuilder<T> Groupable(Action<GridGroupingSettingsBuilder> configurator)
		{

			Component.Grouping.Enabled = true;
			configurator(new GridGroupingSettingsBuilder(Component.Grouping));

			return this;
		}

		/// <summary>
		/// Enables grid grouping.
		/// </summary>
		/// <example>     
		///<code lang="Razor">
		/// @(Html.Kendo().Grid&lt;Product&gt;()
		///     .Name(&quot;grid&quot;)
		///     .Groupable()
		///     .DataSource(dataSource =&gt;
		///         // configure the data source
		///         dataSource
		///             .Ajax()
		///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
		///     )
		/// )
		/// </code>
		/// </example>
		public GridBuilder<T> Groupable()
		{
			return Groupable(delegate { });
		}


		/// <summary>
		/// Sets the resizing configuration of the grid.
		/// </summary>
		/// <param name="configurator">The lambda which configures the resizing</param>
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
		///    .Resizable(resizing => resizing.Columns(true))
		/// )
		/// </code>       
		/// </example>
		public GridBuilder<T> Resizable(Action<GridResizingSettingsBuilder> configurator)
		{

			configurator(new GridResizingSettingsBuilder(Component.Resizable));

			return this;
		}

		/// <summary>
		/// Sets the reordering configuration of the grid.
		/// </summary>
		/// <param name="configurator">The lambda which configures the reordering</param>
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
		///    .Reorderable(reordering => reordering.Columns(true))
		/// )
		/// </code>       
		/// </example>
		public GridBuilder<T> Reorderable(Action<GridReorderingSettingsBuilder> configurator)
		{
			configurator(new GridReorderingSettingsBuilder(Component.Reorderable));

			return this;
		}

		/// <summary>
		/// Enables grid row selection.
		/// </summary>
		/// <example>	
		///<code lang="Razor">
		/// @(Html.Kendo().Grid&lt;Product&gt;()
		///     .Name(&quot;grid&quot;)
		///     .Selectable()
		///     .DataSource(dataSource =&gt;
		///         // configure the data source
		///         dataSource
		///             .Ajax()
		///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
		///     )
		/// )
		/// </code>
		/// </example>
		public GridBuilder<T> Selectable()
		{
			Component.Selectable.Enabled = true;

			return this;
		}

		/// <summary>
		/// Sets the selection configuration of the grid.
		/// </summary>
		/// <param name="configurator">The lambda which configures the selection</param>
		/// <example>
		///<code lang="Razor">
		/// @(Html.Kendo().Grid&lt;Product&gt;()
		///     .Name(&quot;grid&quot;)
		///     .Selectable(selection =&gt; selection.Enabled(true))
		///     .DataSource(dataSource =&gt;
		///         // configure the data source
		///         dataSource
		///             .Ajax()
		///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
		///     )
		/// )
		/// </code>
		/// </example>
		public GridBuilder<T> Selectable(Action<GridSelectionSettingsBuilder> configurator)
		{
			Selectable();

			configurator(new GridSelectionSettingsBuilder(Component.Selectable));

			return this;
		}

		/// <summary>
		/// Enables grid scrolling.
		/// </summary>
		/// <example>		
		///<code lang="Razor">
		/// @(Html.Kendo().Grid&lt;Product&gt;()
		///     .Name(&quot;grid&quot;)
		///     .Scrollable()
		///     .DataSource(dataSource =&gt;
		///         // configure the data source
		///         dataSource
		///             .Ajax()
		///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
		///     )
		/// )
		/// </code>
		/// </example>
		public GridBuilder<T> Scrollable()
		{
			Component.Scrollable.Enabled = true;

			return this;
		}

		/// <summary>
		/// Sets the scrolling configuration of the grid.
		/// </summary>
		/// <param name="configurator">The lambda which configures the scrolling</param>
		/// <example>	
		///<code lang="Razor">
		/// @(Html.Kendo().Grid&lt;Product&gt;()
		///     .Name(&quot;grid&quot;)
		///     .Scrollable(scrolling =&gt; scrolling.Enabled(true))
		///     .DataSource(dataSource =&gt;
		///         // configure the data source
		///         dataSource
		///             .Ajax()
		///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
		///     )
		/// )
		/// </code>
		/// </example>
		public GridBuilder<T> Scrollable(Action<GridScrollSettingsBuilder> configurator)
		{
			Scrollable();

			configurator(new GridScrollSettingsBuilder(Component.Scrollable));

			return this;
		}

		/// <summary>
		/// Sets the column configuration of the grid.
		/// </summary>
		/// <param name="configurator">The lambda which configures columns</param>
		/// <example>
		/// <code lang="ASPX">
		/// &lt;%:Html.Kendo().Grid&lt;Product&gt;()
		///     .Name(&quot;grid&quot;)
		///     .Columns(columns =&gt;
		///     {
		///         columns.Bound(product =&gt; product.ProductName).Title(&quot;Product Name&quot;);
		///         columns.Command(command =&gt; command.Destroy());
		///     })
		///     .DataSource(dataSource =&gt;
		///         // configure the data source
		///         dataSource
		///             .Ajax()
		///             .Destroy(destroy =&gt; destroy.Action(&quot;Products_Destroy&quot;, &quot;Home&quot;))
		///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
		///     )
		/// %&gt;
		/// </code>		
		/// </example>
		public GridBuilder<T> Columns(Action<GridColumnFactory<T>> configurator)
		{

			var factory = new GridColumnFactory<T>(Component, Component.ViewContext, Component.UrlGenerator);

			configurator(factory);

			return this;

		}
	}
	}