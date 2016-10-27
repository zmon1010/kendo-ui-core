---
title: GaugeScaleBuilderBase
---

# Kendo.Mvc.UI.Fluent.GaugeScaleBuilderBase
Defines the fluent interface for configuring scale.



## Properties


### Scale

Gets or sets the scale.




## Methods


### MinorTicks(System.Action\<Kendo.Mvc.UI.Fluent.GaugeScaleTicksBuilder\>)
Configures the minor ticks.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GaugeScaleTicksBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GaugeScaleTicksBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().LinearGauge()
    .Name("linearGauge")
    .Scale(scale => scale
        .MinorTicks(ticks => ticks
            .Visible(false)
        )
    )
    %>


### MajorTicks(System.Action\<Kendo.Mvc.UI.Fluent.GaugeScaleTicksBuilder\>)
Configures the major ticks.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GaugeScaleTicksBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GaugeScaleTicksBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().LinearGauge()
    .Name("linearGauge")
    .Scale(scale => scale
        .MajorTicks(ticks => ticks
            .Visible(false)
        )
    )
    %>


### Ranges(System.Action\<Kendo.Mvc.UI.Fluent.GaugeScaleRangesFactory\<T\>\>)
Defines the ranges items.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GaugeScaleRangesFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GaugeScaleRangesFactory)<T>>
The add action.




#### Example (ASPX)
    <%= Html.Kendo().LinearGauge()
    .Name("linearGauge")
    .Scale(scale => scale
        .Ranges.Add()
        .From(1)
        .To(2)
    )
    %>


### MajorUnit(System.Double)
Sets the scale major unit.


#### Parameters

##### majorUnit `System.Double`
The major unit.




#### Example (ASPX)
    <%= Html.Kendo().LinearGauge()
    .Name("linearGauge")
    .Scale(scale => sclae.MajorUnit(5))
    %>


### MinorUnit(System.Double)
Sets the scale minor unit.


#### Parameters

##### minorUnit `System.Double`
The minor unit.




#### Example (ASPX)
    <%= Html.Kendo().LinearGauge()
    .Name("linearGauge")
    .Scale(scale => sclae.MinorUnit(5))
    %>


### Min(System.Double)
Sets the scale min value.


#### Parameters

##### min `System.Double`
The min.




#### Example (ASPX)
    <%= Html.Kendo().LinearGauge()
    .Name("linearGauge")
    .Scale(scale => sclae.Min(-20))
    %>


### Max(System.Double)
Sets the scale max value.


#### Parameters

##### max `System.Double`
The max.




#### Example (ASPX)
    <%= Html.Kendo().LinearGauge()
    .Name("linearGauge")
    .Scale(scale => sclae.Max(20))
    %>


### Reverse(System.Boolean)
Sets the scale reverse.


#### Parameters

##### reverse `System.Boolean`
The scale reverse.




#### Example (ASPX)
    <%= Html.Kendo().LinearGauge()
    .Name("linearGauge")
    .Scale(scale => sclae.reverse(true))
    %>


### Line(System.Action\<Kendo.Mvc.UI.Fluent.GaugeLineBuilder\>)
Configures the major ticks.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GaugeLineBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GaugeLineBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().LinearGauge()
    .Name("linearGauge")
    .Scale(scale => scale
        .Line(line => line
            .Visible(false)
        )
    )
    %>



