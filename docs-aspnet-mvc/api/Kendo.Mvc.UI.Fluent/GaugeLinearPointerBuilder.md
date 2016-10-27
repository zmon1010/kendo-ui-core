---
title: GaugeLinearPointerBuilder
---

# Kendo.Mvc.UI.Fluent.GaugeLinearPointerBuilder
Defines the fluent interface for configuring the GaugeLinearPointerBuilder.




## Methods


### Color(System.String)
Sets the pointer color.


#### Parameters

##### color `System.String`
The pointer color.




#### Example (ASPX)
    <% Html.Kendo().LinearGauge()
        .Name("linearGauge")
        .Pointer(pointer => pointer
            .Color("red")
        )
        .Render();
    %>


### Shape(Kendo.Mvc.UI.GaugeLinearPointerShape)
Sets the pointer shape.


#### Parameters

##### shape [Kendo.Mvc.UI.GaugeLinearPointerShape](/api/aspnet-mvc/Kendo.Mvc.UI/GaugeLinearPointerShape)
The pointer shape.




#### Example (ASPX)
    <% Html.Kendo().LinearGauge()
        .Name("linearGauge")
        .Pointer(pointer => pointer
            .Shape(LinearGaugePointerShape.Arrow)
        )
        .Render();
    %>


### Margin(System.Int32,System.Int32,System.Int32,System.Int32)
Sets the pointer margin.


#### Parameters

##### top `System.Int32`
The pointer top margin.

##### right `System.Int32`
The pointer right margin.

##### bottom `System.Int32`
The pointer bottom margin.

##### left `System.Int32`
The pointer left margin.




#### Example (ASPX)
    <% Html.Kendo().LinearGauge()
        .Name("linearGauge")
        .Pointer(pointer => pointer
            .Margin(20, 20, 20, 20)
        )
        .Render();
    %>


### Margin(System.Int32)
Sets the pointer margin.


#### Parameters

##### margin `System.Int32`
The pointer margin.




#### Example (ASPX)
    <% Html.Kendo().LinearGauge()
        .Name("linearGauge")
        .Pointer(pointer => pointer
            .Margin(20)
        )
        .Render();
    %>


### Border(System.Int32,System.String,Kendo.Mvc.UI.ChartDashType)
Sets the pointer border


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
            .Border(1, "#000", ChartDashType.Dot)
        )
        .Render();
    %>


### Border(System.Action\<Kendo.Mvc.UI.Fluent.ChartBorderBuilder\>)
Configures the pointer border


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartBorderBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartBorderBuilder)>
The border configuration action





### Opacity(System.Double)
Sets the pointer opacity.


#### Parameters

##### opacity `System.Double`
The pointer opacity in the range from 0 (transparent) to 1 (opaque).
            The default value is 1.




#### Example (ASPX)
    <% Html.Kendo().LinearGauge()
        .Name("linearGauge")
        .Pointer(pointer => pointer
            .Opacity(0.5)
        )
        .Render();
    %>


### Size(System.Double)
Sets the pointer size.


#### Parameters

##### size `System.Double`
The pointer size.




#### Example (ASPX)
    <% Html.Kendo().LinearGauge()
        .Name("linearGauge")
        .Pointer(pointer => pointer
            .Size(8)
        )
        .Render();
    %>


### Value(System.Double)
Sets the pointer value.


#### Parameters

##### value `System.Double`
The pointer value.




#### Example (ASPX)
    <% Html.Kendo().LinearGauge()
        .Name("linearGauge")
        .Pointer(pointer => pointer
            .Value(25)
        )
        .Render();
    %>


### Track(System.Action\<Kendo.Mvc.UI.Fluent.GaugeLinearTrackBuilder\>)
Configures the pointer track.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GaugeLinearTrackBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GaugeLinearTrackBuilder)>
The configuration action.




#### Example (ASPX)
    <% Html.Kendo().LinearGauge()
        .Name("linearGauge")
        .Pointer(pointer => pointer
            .Track(track => track.Visible(true))
        )
        .Render();
    %>



