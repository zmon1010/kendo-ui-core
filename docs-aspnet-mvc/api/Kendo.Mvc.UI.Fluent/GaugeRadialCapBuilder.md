---
title: GaugeRadialCapBuilder
---

# Kendo.Mvc.UI.Fluent.GaugeRadialCapBuilder
Defines the fluent interface for configuring the GaugeRadialCapBuilder.




## Methods


### Color(System.String)
Sets the cap color.


#### Parameters

##### color `System.String`
The cap color.




#### Example (ASPX)
    <% Html.Kendo().RadialGauge()
        .Name("radialGauge")
        .Pointer(pointer => pointer
            .Cap(cap => cap.Color("red"))
        )
        .Render();
    %>


### Opacity(System.Double)
Sets the cap opacity.


#### Parameters

##### opacity `System.Double`
The cap opacity in the range from 0 (transparent) to 1 (opaque).
            The default value is 1.




#### Example (ASPX)
    <% Html.Kendo().RadialGauge()
        .Name("radialGauge")
        .Pointer(pointer => pointer
            .Cap(cap => cap.Opacity(0.5))
        )
        .Render();
    %>


### Size(System.Double)
Sets the cap size in percents.


#### Parameters

##### size `System.Double`
The cap size in percents.




#### Example (ASPX)
    <% Html.Kendo().RadialGauge()
        .Name("radialGauge")
        .Pointer(pointer => pointer
            .Cap(cap => cap.Size(8))
        )
        .Render();
    %>



