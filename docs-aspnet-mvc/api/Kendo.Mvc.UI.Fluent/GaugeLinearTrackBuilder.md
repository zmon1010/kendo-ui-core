---
title: GaugeLinearTrackBuilder
---

# Kendo.Mvc.UI.Fluent.GaugeLinearTrackBuilder
Defines the fluent interface for configuring the linear gauge track.




## Methods


### Color(System.String)
Sets the track color.


#### Parameters

##### color `System.String`
The track color.




#### Example (ASPX)
    <% Html.Kendo().LinearGauge()
        .Name("linearGauge")
        .Pointer(pointer => pointer
            .Track(track => track.Color("red"))
        )
        .Render();
    %>


### Size(System.Double)
Sets the track size.


#### Parameters

##### size `System.Double`
The track size.




#### Example (ASPX)
    <% Html.Kendo().LinearGauge()
        .Name("linearGauge")
        .Pointer(pointer => pointer
            .Track(track => track.Size(8))
        )
        .Render();
    %>


### Visible(System.Boolean)
Sets the track visibility.


#### Parameters

##### visible `System.Boolean`
The track visibility.




#### Example (ASPX)
    <% Html.Kendo().LinearGauge()
        .Name("linearGauge")
        .Pointer(pointer => pointer
            .Track(track => track.Visible(true))
        )
        .Render();
    %>


### Border(System.Int32,System.String,Kendo.Mvc.UI.ChartDashType)
Sets the track border.


#### Parameters

##### width `System.Int32`
The pointer border width.

##### color `System.String`
The pointer border color.

##### dashType [Kendo.Mvc.UI.ChartDashType](/api/aspnet-mvc/Kendo.Mvc.UI/ChartDashType)
The pointer dash type.




#### Example (ASPX)
    <% Html.Kendo().LinearGauge()
        .Name("linearGauge")
        .Pointer(pointer => pointer
            .Track(track => track.Border(1, "#000", ChartDashType.Dot))
        )
        .Render();
    %>


### Border(System.Action\<Kendo.Mvc.UI.Fluent.ChartBorderBuilder\>)
Configures the track border


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartBorderBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartBorderBuilder)>
The border configuration action






