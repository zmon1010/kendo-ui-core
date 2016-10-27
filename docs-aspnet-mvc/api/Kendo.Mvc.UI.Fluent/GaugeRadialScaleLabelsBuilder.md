---
title: GaugeRadialScaleLabelsBuilder
---

# Kendo.Mvc.UI.Fluent.GaugeRadialScaleLabelsBuilder
Defines the fluent interface for configuring the radial gauge labels.




## Methods


### Position(Kendo.Mvc.UI.GaugeRadialScaleLabelsPosition)
Sets the labels position


#### Parameters

##### position [Kendo.Mvc.UI.GaugeRadialScaleLabelsPosition](/api/aspnet-mvc/Kendo.Mvc.UI/GaugeRadialScaleLabelsPosition)
The labels position.




#### Example (ASPX)
    <%= Html.Kendo().LinearGauge()
    .Name("linearGauge")
    .Scale(scale => scale
        .Labels(labels => labels
            .Position(GaugeRadialScaleLabelsPosition.Inside)
        )
    )
    %>



