---
title: ChartNavigatorSelectionBuilder
---

# Kendo.Mvc.UI.Fluent.ChartNavigatorSelectionBuilder
Defines the fluent interface for configuring the ChartNavigatorSelectionBuilder.




## Methods


### From(System.DateTime)
Sets the selection lower boundary


#### Parameters

##### fromDate `System.DateTime`
The selection lower boundary.




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("Chart")
    .Navigator(nav => nav.Select(x => x.From(DateTime.Today)))
    %>


### To(System.DateTime)
Sets the selection upper boundary


#### Parameters

##### toDate `System.DateTime`
The selection upper boundary.




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("Chart")
    .Navigator(nav => nav.Select(x => x.To(DateTime.Today)))
    %>
    %>


### Mousewheel(System.Boolean)
Enable or disable mouse wheel zooming.





### Mousewheel(System.Action\<Kendo.Mvc.UI.Fluent.ChartSelectionMousewheelBuilder\>)
Configures the mousewheel selection options


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartSelectionMousewheelBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartSelectionMousewheelBuilder)>
The mousewheel zoom options






