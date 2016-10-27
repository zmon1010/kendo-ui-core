---
title: ChartBorderBuilder
---

# Kendo.Mvc.UI.Fluent.ChartBorderBuilder
Defines the fluent interface for configuring ChartElementBorder.




## Methods


### Color(System.String)
Sets the border color.


#### Parameters

##### color `System.String`
The border color (CSS format).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .ChartArea(chartArea => chartArea.Border(border => border.Color("#f00")))
        .Render();
    %>


### Opacity(System.Double)
Sets the border opacity


#### Parameters

##### opacity `System.Double`
The border opacity (CSS format).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .ChartArea(chartArea => chartArea.Border(border => border.Opacity(0.2)))
        .Render();
    %>


### Width(System.Int32)
Sets the border width.


#### Parameters

##### width `System.Int32`
The border width.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .ChartArea(chartArea => chartArea.Border(border => border.Width(2)))
        .Render();
    %>


### DashType(Kendo.Mvc.UI.ChartDashType)
Sets the border dashType.


#### Parameters

##### dashType [Kendo.Mvc.UI.ChartDashType](/api/aspnet-mvc/Kendo.Mvc.UI/ChartDashType)
The border dashType.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .ChartArea(chartArea => chartArea.Border(border => border.DashType(ChartDashType.Dot)))
        .Render();
    %>



