---
title: GaugeLinearScaleBuilder
---

# Kendo.Mvc.UI.Fluent.GaugeLinearScaleBuilder
Defines the fluent interface for configuring the gauge scale.



## Properties


### linearGauge

The parent Guage




## Methods


### Mirror(System.Boolean)
Sets the mirror of the gauge


#### Parameters

##### mirror `System.Boolean`
The mirror.




#### Example (ASPX)
    <%= Html.Kendo().LinearGauge()
    .Name("LinearGauge")
    .Scale(scale => scale
        .Mirror(true)
    )
    %>


### Vertical(System.Boolean)
Sets the orientation of the gauge


#### Parameters

##### vertical `System.Boolean`
The vertical.




#### Example (ASPX)
    <%= Html.Kendo().LinearGauge()
    .Name("LinearGauge")
    .Scale(scale => scale
        .Vertical(false)
    )
    %>


### Labels(System.Action\<Kendo.Mvc.UI.Fluent.GaugeLinearScaleLabelsBuilder\>)
Configures the labels.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GaugeLinearScaleLabelsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GaugeLinearScaleLabelsBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().LinearGauge()
    .Name("linearGauge")
    .Scale(scale => scale
        .Labels(labels => labels
            .Visible(false)
        )
    )
    %>



