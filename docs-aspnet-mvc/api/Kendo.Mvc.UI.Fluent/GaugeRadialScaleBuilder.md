---
title: GaugeRadialScaleBuilder
---

# Kendo.Mvc.UI.Fluent.GaugeRadialScaleBuilder
Defines the fluent interface for configuring the gauge scale.



## Properties


### radialGauge

The parent Guage




## Methods


### EndAngle(System.Double)
Sets the end angle of the gauge


#### Parameters

##### endAngle `System.Double`
The end angle.




#### Example (ASPX)
    <%= Html.Kendo().RadialGauge()
    .Name("radialGauge")
    .Scale(scale => scale
        .EndAngle(10)
    )
    %>


### StartAngle(System.Double)
Sets the start angle of the gauge


#### Parameters

##### startAngle `System.Double`
The start Angle.




#### Example (ASPX)
    <%= Html.Kendo().RadialGauge()
    .Name("radialGauge")
    .Scale(scale => scale
        .StartAngle(220)
    )
    %>


### Labels(System.Action\<Kendo.Mvc.UI.Fluent.GaugeRadialScaleLabelsBuilder\>)
Configures the labels.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GaugeRadialScaleLabelsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GaugeRadialScaleLabelsBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().RadialGauge()
    .Name("radialGauge")
    .Scale(scale => scale
        .Labels(labels => labels
            .Visible(false)
        )
    )
    %>


### RangeSize(System.Double)
Sets the width of the range indicators.


#### Parameters

##### theme `System.Double`
The width of the range indicators.




#### Example (ASPX)
    <%= Html.Kendo().RadialGauge()
    .Name("radialGauge")
    .Scale(scale => scale
        .RangeSize(4)
    )
    %>


### RangeDistance(System.Double)
Sets the distance from the range indicators to the ticks.


#### Parameters

##### theme `System.Double`
The distance from the range indicators to the ticks.




#### Example (ASPX)
    <%= Html.Kendo().RadialGauge()
    .Name("radialGauge")
    .Scale(scale => scale
        .RangeDistance(4)
    )
    %>



