---
title: GaugeLineBuilder
---

# Kendo.Mvc.UI.Fluent.GaugeLineBuilder
Defines the fluent interface for configuring GaugeLine.




## Methods


### Visible(System.Boolean)
Sets the line visibility


#### Parameters

##### visible `System.Boolean`
The line visibility.




#### Example (ASPX)
    <% Html.Kendo().LinearGauge()
        .Name("linearGauge")
        .Scale(scale => scale.Line(line => line.Color("#f00")))
        .Render();
    %>



