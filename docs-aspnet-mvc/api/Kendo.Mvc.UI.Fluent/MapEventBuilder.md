---
title: MapEventBuilder
---

# Kendo.Mvc.UI.Fluent.MapEventBuilder
Defines the fluent API for configuring the Kendo Map for ASP.NET MVC events.




## Methods


### BeforeReset(System.String)
Fired immediately before the map is reset.
            This event is typically used for cleanup by layer implementers.

For additional information check the [beforeReset event](/api/javascript/dataviz/ui/map#events-beforeReset) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the beforeReset event.





### Click(System.String)
Fired when the user clicks on the map.

For additional information check the [click event](/api/javascript/dataviz/ui/map#events-click) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the click event.





### MarkerActivate(System.String)
Fired when a marker has been displayed and has a DOM element assigned.

For additional information check the [markerActivate event](/api/javascript/dataviz/ui/map#events-markerActivate) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the markerActivate event.





### MarkerCreated(System.String)
Fired when a marker has been created and is about to be displayed.
            Cancelling the event will prevent the marker from being shown.Use markerActivate if you need to access the marker DOM element.

For additional information check the [markerCreated event](/api/javascript/dataviz/ui/map#events-markerCreated) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the markerCreated event.





### MarkerClick(System.String)
Fired when a marker has been clicked or tapped.

For additional information check the [markerClick event](/api/javascript/dataviz/ui/map#events-markerClick) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the markerClick event.





### Pan(System.String)
Fired while the map viewport is being moved.

For additional information check the [pan event](/api/javascript/dataviz/ui/map#events-pan) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the pan event.





### PanEnd(System.String)
Fires after the map viewport has been moved.

For additional information check the [panEnd event](/api/javascript/dataviz/ui/map#events-panEnd) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the panEnd event.





### Reset(System.String)
Fired when the map is reset.
            This typically occurs on initial load and after a zoom/center change.

For additional information check the [reset event](/api/javascript/dataviz/ui/map#events-reset) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the reset event.





### ShapeClick(System.String)
Fired when a shape is clicked or tapped.

For additional information check the [shapeClick event](/api/javascript/dataviz/ui/map#events-shapeClick) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the shapeClick event.





### ShapeCreated(System.String)
Fired when a shape is created, but is not rendered yet.

For additional information check the [shapeCreated event](/api/javascript/dataviz/ui/map#events-shapeCreated) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the shapeCreated event.





### ShapeFeatureCreated(System.String)
Fired when a GeoJSON Feature is created on a shape layer.

For additional information check the [shapeFeatureCreated event](/api/javascript/dataviz/ui/map#events-shapeFeatureCreated) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the shapeFeatureCreated event.





### ShapeMouseEnter(System.String)
Fired when the mouse enters a shape.

For additional information check the [shapeMouseEnter event](/api/javascript/dataviz/ui/map#events-shapeMouseEnter) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the shapeMouseEnter event.





### ShapeMouseLeave(System.String)
Fired when the mouse leaves a shape.

For additional information check the [shapeMouseLeave event](/api/javascript/dataviz/ui/map#events-shapeMouseLeave) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the shapeMouseLeave event.





### ZoomStart(System.String)
Fired when the map zoom level is about to change.
            Cancelling the event will prevent the user action.

For additional information check the [zoomStart event](/api/javascript/dataviz/ui/map#events-zoomStart) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the zoomStart event.





### ZoomEnd(System.String)
Fired when the map zoom level has changed.

For additional information check the [zoomEnd event](/api/javascript/dataviz/ui/map#events-zoomEnd) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the zoomEnd event.






