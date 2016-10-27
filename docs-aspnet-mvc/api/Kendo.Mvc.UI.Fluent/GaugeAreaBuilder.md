---
title: GaugeAreaBuilder
---

# Kendo.Mvc.UI.Fluent.GaugeAreaBuilder
Defines the fluent interface for configuring the GaugeArea.




## Methods


### Background(System.String)
Sets the chart area background color.


#### Parameters

##### background `System.String`
The background color.




#### Example (ASPX)
    <% Html.Kendo().LinearGauge()
        .Name("linearGauge")
        .GaugeArea(gaugeArea => gaugeArea.Background("red"))
        .Render();
    %>


### Margin(System.Int32,System.Int32,System.Int32,System.Int32)
Sets the gauge area margin.


#### Parameters

##### top `System.Int32`
The gauge area top margin.

##### right `System.Int32`
The gauge area right margin.

##### bottom `System.Int32`
The gauge area bottom margin.

##### left `System.Int32`
The gauge area left margin.




#### Example (ASPX)
    <% Html.Kendo().LinearGauge()
        .Name("linearGauge")
        .GaugeArea(gaugeArea => gaugeArea.Margin(0, 5, 5, 0))
        .Render();
    %>


### Margin(System.Int32)
Sets the gauge area margin.


#### Parameters

##### margin `System.Int32`
The gauge area margin.




#### Example (ASPX)
    <% Html.Kendo().LinearGauge()
        .Name("linearGauge")
        .GaugeArea(gaugeArea => gaugeArea.Margin(5))
        .Render();
    %>


### Border(System.Int32,System.String,Kendo.Mvc.UI.ChartDashType)
Sets the gauge area border.


#### Parameters

##### width `System.Int32`
The border width.

##### color `System.String`
The border color (CSS syntax).

##### dashType [Kendo.Mvc.UI.ChartDashType](/api/aspnet-mvc/Kendo.Mvc.UI/ChartDashType)
The border dash type.




#### Example (ASPX)
    <% Html.Kendo().LinearGauge()
        .Name("linearGauge")
        .GaugeArea(gaugeArea => gaugeArea.Border(1, "#000", ChartDashType.Dot))
        .Render();
    %>


### Border(System.Action\<Kendo.Mvc.UI.Fluent.ChartBorderBuilder\>)
Configures the gauge area border


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartBorderBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartBorderBuilder)>
The border configuration action






