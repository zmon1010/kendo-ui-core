---
title: DiagramShapeDefaultsFillGradientSettingsBuilder
---

# Kendo.Mvc.UI.Fluent.DiagramShapeDefaultsFillGradientSettingsBuilder
Defines the fluent API for configuring the DiagramShapeDefaultsFillGradientSettings settings.




## Methods


### Type(System.String)
The type of the gradient. Supported values are:Note that support for radial gradients in VML (IE8 and below) is limited.
            Not all configurations are guaranteed to work.


#### Parameters

##### value `System.String`
The value that configures the type.





### Center(System.Double[])
The center of the radial gradient.Coordinates are relative to the shape bounding box.
            For example [0, 0] is top left and [1, 1] is bottom right.


#### Parameters

##### value `System.Double[]`
The value that configures the center.





### Radius(System.Double)
The radius of the radial gradient relative to the shape bounding box.


#### Parameters

##### value `System.Double`
The value that configures the radius.





### Start(System.Double[])
The start point of the linear gradient.Coordinates are relative to the shape bounding box.
            For example [0, 0] is top left and [1, 1] is bottom right.


#### Parameters

##### value `System.Double[]`
The value that configures the start.





### End(System.Double[])
The end point of the linear gradient.Coordinates are relative to the shape bounding box.
            For example [0, 0] is top left and [1, 1] is bottom right.


#### Parameters

##### value `System.Double[]`
The value that configures the end.





### Stops(System.Action\<Kendo.Mvc.UI.Fluent.DiagramShapeDefaultsFillGradientSettingsStopFactory\<T,T\>\>)
The array of gradient color stops.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramShapeDefaultsFillGradientSettingsStopFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramShapeDefaultsFillGradientSettingsStopFactory)<T,T>>
The action that configures the stops.






