---
title: RadialGaugeBuilder
---

# Kendo.Mvc.UI.Fluent.RadialGaugeBuilder
Defines the fluent interface for configuring the RadialGauge component.




## Methods


### Theme(System.String)
Sets the theme of the radial gauge.


#### Parameters

##### theme `System.String`
The radial gauge theme.




#### Example (ASPX)
    <%= Html.Kendo().RadialGauge()
    .Name("radialGauge")
    .Theme("Black")
    %>


### RenderAs(Kendo.Mvc.UI.RenderingMode)
Sets the preferred rendering engine.
            If it is not supported by the browser, the Chart will switch to the first available mode.


#### Parameters

##### renderAs [Kendo.Mvc.UI.RenderingMode](/api/aspnet-mvc/Kendo.Mvc.UI/RenderingMode)
The preferred rendering engine.





### GaugeArea(System.Action\<Kendo.Mvc.UI.Fluent.GaugeAreaBuilder\>)
Sets the radial gauge area.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GaugeAreaBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GaugeAreaBuilder)>
The radial gauge area.




#### Example (ASPX)
    <%= Html.Kendo().RadialGauge()
    .Name("radialGauge")
    .ChartArea(chartArea => chartArea.margin(20))
    %>


### Scale(System.Action\<Kendo.Mvc.UI.Fluent.GaugeRadialScaleBuilder\>)
Configures the scale


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GaugeRadialScaleBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GaugeRadialScaleBuilder)>
The configurator




#### Example (ASPX)
    <%= Html.Kendo().RadialGauge()
    .Name("radialGauge")
    .Scale(scale => scale
        .Min(10)
    )
    %>


### Pointer(System.Action\<Kendo.Mvc.UI.Fluent.GaugeRadialPointerBuilder\>)
Configures the pointer


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GaugeRadialPointerBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GaugeRadialPointerBuilder)>
The configurator




#### Example (ASPX)
    <%= Html.Kendo().RadialGauge()
    .Name("radialGauge")
    .Pointer(pointer => pointer
        .Value(10)
    )
    %>


### Pointers(System.Action\<Kendo.Mvc.UI.Fluent.GaugeRadialPointerFactory\>)
Allows configuring multiple pointers


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GaugeRadialPointerFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GaugeRadialPointerFactory)>
The lambda which configures the pointers




#### Example (ASPX)
    <%= Html.Kendo().RadialGauge()
    .Name("gauge")
    .Pointers(pointer =>
    {
        pointer.Add().Value(10);
        pointer.Add().Value(20);
    })
    %>

#### Example (Razor)
    @(Html.Kendo().RadialGauge()
        .Name("gauge")
        .Pointers(pointer =>
        {
            pointer.Add().Value(10);
            pointer.Add().Value(20);
        })
    )


### Transitions(System.Boolean)
Enables or disabled animated transitions on initial load and refresh.


#### Parameters

##### transitions `System.Boolean`
A value indicating if transition animations should be played.




#### Example (ASPX)
    <%= Html.Kendo().RadialGauge()
    .Name("radialScale")
    .Transitions(false)
    %>



