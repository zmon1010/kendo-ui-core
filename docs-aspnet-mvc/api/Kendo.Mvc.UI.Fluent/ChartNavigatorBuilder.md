---
title: ChartNavigatorBuilder
---

# Kendo.Mvc.UI.Fluent.ChartNavigatorBuilder
Defines the fluent interface for configuring the 1.




## Methods


### Select(System.Nullable\<System.DateTime\>,System.Nullable\<System.DateTime\>)
Sets the selection range


#### Parameters

##### from `System.Nullable<System.DateTime>`
The selection range start.

##### to `System.Nullable<System.DateTime>`
The selection range end.




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("StockChart")
    .Navigator(nav => nav.Select(DateTime.Today.AddMonths(-1), DateTime.Today))
    %>


### Select(System.Action\<Kendo.Mvc.UI.Fluent.ChartNavigatorSelectionBuilder\>)
Defines the navigator selection.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartNavigatorSelectionBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartNavigatorSelectionBuilder)>
The add action.




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("Chart")
    .Navigator(nav => nav.Select(x => x.From(DateTime.Today)))
    %>


### Series(System.Action\<Kendo.Mvc.UI.Fluent.ChartSeriesFactory\<T\>\>)
Defines the navigator series. At least one series should be configured.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartSeriesFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartSeriesFactory)<T>>
The add action.




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("Chart")
    .Navigator(nav =>
        nav.Series(series =>
        {
            series.Bar(s => s.SalesAmount);
        })
    )
    %>


### Visible(System.Boolean)
Sets the navigator visibility


#### Parameters

##### visible `System.Boolean`
The navigator visibility.




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("Chart")
    .Navigator(nav => nav
        .Series(series =>
        {
            series.Bar(s => s.SalesAmount);
        })
        .Visible(false)
    )
    %>


### Hint(System.Action\<Kendo.Mvc.UI.Fluent.ChartNavigatorHintBuilder\>)
Defines the navigator hint.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartNavigatorHintBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartNavigatorHintBuilder)>
The add action.




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("Chart")
    .Navigator(nav =>
        nav.Series(series =>
        {
            series.Bar(s => s.SalesAmount);
        })
    )
    %>


### DataSource(System.Action\<Kendo.Mvc.UI.Fluent.ReadOnlyAjaxDataSourceBuilder\<T\>\>)
Data Source configuration for the Navigator.
            When configured, the Navigator will filter the main StockChart data source to the selected range.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ReadOnlyAjaxDataSourceBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ReadOnlyAjaxDataSourceBuilder)<T>>
Use the configurator to set different data binding options.




#### Example (ASPX)
    <%= Html.Kendo().StockChart()
    .Name("Chart")
    .Navigator(navi => navi
        .DataSource(ds =>
        {
            ds.Ajax().Read(r => r.Action("SalesData", "Chart"));
        })
    )
    %>


### DateField(System.String)
Sets the field used by the navigator date axes.


#### Parameters

##### dateField `System.String`
The date field.




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("Chart")
    .Navigator(navi => navi
        .DateField("Date")
    )
    %>


### AutoBind(System.Boolean)
Enables or disables automatic binding.


#### Parameters

##### autoBind `System.Boolean`
Gets or sets a value indicating if the navigator
            should be data bound during initialization.
            The default value is true.




#### Example (ASPX)
    <%= Html.Kendo().StockChart()
    .Name("Chart")
    .Navigator(navi => navi
        .DataSource(ds =>
        {
            ds.Ajax().Read(r => r.Action("SalesData", "Chart"));
        })
        .AutoBind(false)
    )
    %>


### CategoryAxis(System.Action\<Kendo.Mvc.UI.Fluent.ChartCategoryAxisBuilder\<T\>\>)
Configures the navigator category axis


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartCategoryAxisBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartCategoryAxisBuilder)<T>>
The configurator





### Pane(System.Action\<Kendo.Mvc.UI.Fluent.ChartPaneBuilder\>)
Configures the a navigator pane.






