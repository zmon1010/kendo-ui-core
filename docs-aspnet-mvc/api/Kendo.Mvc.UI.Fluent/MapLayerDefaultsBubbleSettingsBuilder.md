---
title: MapLayerDefaultsBubbleSettingsBuilder
---

# Kendo.Mvc.UI.Fluent.MapLayerDefaultsBubbleSettingsBuilder
Defines the fluent API for configuring the MapLayerDefaultsBubbleSettings settings.




## Methods


### Attribution(System.String)
The attribution for all bubble layers.


#### Parameters

##### value `System.String`
The value that configures the attribution.





### Opacity(System.Double)
The the opacity of all bubble layers.


#### Parameters

##### value `System.Double`
The value that configures the opacity.





### MaxSize(System.Double)
The maximum symbol size for bubble layer symbols.


#### Parameters

##### value `System.Double`
The value that configures the maxsize.





### MinSize(System.Double)
The minimum symbol size for bubble layer symbols.


#### Parameters

##### value `System.Double`
The value that configures the minsize.





### Style(System.Action\<Kendo.Mvc.UI.Fluent.MapLayerDefaultsBubbleStyleSettingsBuilder\>)
The default style for bubble layer symbols.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MapLayerDefaultsBubbleStyleSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MapLayerDefaultsBubbleStyleSettingsBuilder)>
The action that configures the style.





### Symbol(Kendo.Mvc.UI.MapSymbol)
The bubble layer symbol type. Supported symbols are "circle" and "square".


#### Parameters

##### value [Kendo.Mvc.UI.MapSymbol](/api/aspnet-mvc/Kendo.Mvc.UI/MapSymbol)
The value that configures the symbol.





### Symbol(System.String)
The bubble layer symbol type. The "circle" and "square" symbols are predefined.


#### Parameters

##### value `System.String`
The value that configures the symbol.





### SymbolHandler(System.String)
A client-side function to invoke that will draw the symbol.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will draw the symbol.






