---
title: MapMarkerBuilder
---

# Kendo.Mvc.UI.Fluent.MapMarkerBuilder
Defines the fluent API for configuring the MapMarker settings.




## Methods


### Location(System.Double[])
The marker location on the map. Coordinates are listed as [Latitude, Longitude].


#### Parameters

##### value `System.Double[]`
The value that configures the location.





### Title(System.String)
The marker title. Displayed as browser tooltip.


#### Parameters

##### value `System.String`
The value that configures the title.





### Shape(Kendo.Mvc.UI.MapMarkersShape)
The marker shape. Supported shapes are "pin" and "pinTarget".


#### Parameters

##### value [Kendo.Mvc.UI.MapMarkersShape](/api/aspnet-mvc/Kendo.Mvc.UI/MapMarkersShape)
The value that configures the shape.





### Shape(System.String)
The marker shape name. The "pin" and "pinTarget" shapes are predefined.


#### Parameters

##### value `System.String`
The name of the shape.





### Tooltip(System.Action\<Kendo.Mvc.UI.Fluent.MapMarkerTooltipBuilder\>)
The tooltip options for this marker.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MapMarkerTooltipBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MapMarkerTooltipBuilder)>
The action that configures the tooltip.





### HtmlAttributes(System.Object)
Sets the HTML attributes.


#### Parameters

##### attributes `System.Object`
The HTML attributes.



#### Returns




### HtmlAttributes(System.Collections.Generic.IDictionary\<System.String,System.Object\>)
Sets the HTML attributes.


#### Parameters

##### attributes `System.Collections.Generic.IDictionary<System.String,System.Object>`
The HTML attributes.



#### Returns





