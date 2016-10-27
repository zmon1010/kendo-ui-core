---
title: MapBuilder
---

# Kendo.Mvc.UI.Fluent.MapBuilder
Defines the fluent API for configuring the Kendo Map for ASP.NET MVC.




## Methods


### Center(System.Double,System.Double)
Configures the center of the map.


#### Parameters

##### latitude `System.Double`
The latitude

##### longtitude `System.Double`
The longtitude





### Controls(System.Action\<Kendo.Mvc.UI.Fluent.MapControlsSettingsBuilder\>)
The configuration of built-in map controls.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MapControlsSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MapControlsSettingsBuilder)>
The action that configures the controls.





### LayerDefaults(System.Action\<Kendo.Mvc.UI.Fluent.MapLayerDefaultsSettingsBuilder\>)
The default configuration for map layers by type.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MapLayerDefaultsSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MapLayerDefaultsSettingsBuilder)>
The action that configures the layerdefaults.





### MinZoom(System.Double)
The minimum zoom level.
            Typical web maps use zoom levels from 0 (whole world) to 19 (sub-meter features).


#### Parameters

##### value `System.Double`
The value that configures the minzoom.





### MaxZoom(System.Double)
The maximum zoom level.
            Typical web maps use zoom levels from 0 (whole world) to 19 (sub-meter features).


#### Parameters

##### value `System.Double`
The value that configures the maxzoom.





### MinSize(System.Double)
The size of the map in pixels at zoom level 0.


#### Parameters

##### value `System.Double`
The value that configures the minsize.





### Pannable(System.Boolean)
Controls whether the user can pan the map.


#### Parameters

##### value `System.Boolean`
The value that configures the pannable.





### Wraparound(System.Boolean)
Specifies whether the map should wrap around the east-west edges.


#### Parameters

##### value `System.Boolean`
The value that configures the wraparound.





### Zoom(System.Double)
The initial zoom level.Typical web maps use zoom levels from 0 (whole world) to 19 (sub-meter features).The map size is derived from the zoom level and minScale options: size = (2 ^ zoom) * minSize


#### Parameters

##### value `System.Double`
The value that configures the zoom.





### Zoomable(System.Boolean)
Controls whether the map zoom level can be changed by the user.


#### Parameters

##### value `System.Boolean`
The value that configures the zoomable.





### Layers(System.Action\<Kendo.Mvc.UI.Fluent.MapLayerFactory\>)
The configuration of the map layers.
            The layer type is determined by the value of the type field.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MapLayerFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MapLayerFactory)>
The action that configures the layers.





### Markers(System.Action\<Kendo.Mvc.UI.Fluent.MapMarkerFactory\>)
The configuration of the map markers.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MapMarkerFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MapMarkerFactory)>
The action that configures the markers.





### MarkerDefaults(System.Action\<Kendo.Mvc.UI.Fluent.MapMarkerDefaultsSettingsBuilder\>)
The default options for all markers.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MapMarkerDefaultsSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MapMarkerDefaultsSettingsBuilder)>
The action that configures the markerdefaults.





### Events(System.Action\<Kendo.Mvc.UI.Fluent.MapEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MapEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MapEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().Map()
    .Name("Map")
    .Events(events => events
        .Click("onClick")
    )
    %>



