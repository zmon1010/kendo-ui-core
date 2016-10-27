---
title: ChartAreaBuilder
---

# Kendo.Mvc.UI.Fluent.ChartAreaBuilder
Defines the fluent interface for configuring the ChartArea.




## Methods


### Background(System.String)
Sets the chart area background color.


#### Parameters

##### background `System.String`
The background color.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .ChartArea(chartArea => chartArea.Background("Red"))
        .Render();
    %>


### Margin(System.Int32,System.Int32,System.Int32,System.Int32)
Sets the chart area margin.


#### Parameters

##### top `System.Int32`
The chart area top margin.

##### right `System.Int32`
The chart area right margin.

##### bottom `System.Int32`
The chart area bottom margin.

##### left `System.Int32`
The chart area left margin.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .ChartArea(chartArea => chartArea.Margin(0, 5, 5, 0))
        .Render();
    %>


### Margin(System.Int32)
Sets the chart area margin.


#### Parameters

##### margin `System.Int32`
The chart area margin.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .ChartArea(chartArea => chartArea.Margin(5))
        .Render();
    %>


### Border(System.Int32,System.String,Kendo.Mvc.UI.ChartDashType)
Sets the chart area border.


#### Parameters

##### width `System.Int32`
The border width.

##### color `System.String`
The border color (CSS syntax).

##### dashType [Kendo.Mvc.UI.ChartDashType](/api/aspnet-mvc/Kendo.Mvc.UI/ChartDashType)
The border dash type.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .ChartArea(chartArea => chartArea.Border(1, "#000", ChartDashType.Dot))
        .Render();
    %>


### Border(System.Action\<Kendo.Mvc.UI.Fluent.ChartBorderBuilder\>)
Configures the plot area border


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartBorderBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartBorderBuilder)>
The border configuration action





### Height(System.Int32)
Sets the height of the chart area.


#### Parameters

##### height `System.Int32`
The chart area height.





### Width(System.Int32)
Sets the width of the chart area.


#### Parameters

##### height `System.Int32`
The chart area width.






