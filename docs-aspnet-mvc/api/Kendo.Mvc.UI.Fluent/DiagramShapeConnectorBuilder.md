---
title: DiagramShapeConnectorBuilder
---

# Kendo.Mvc.UI.Fluent.DiagramShapeConnectorBuilder
Defines the fluent API for configuring the DiagramShapeConnector settings.




## Methods


### Description(System.String)
The connector description.


#### Parameters

##### value `System.String`
The value that configures the description.





### Name(System.String)
The connector name. Predefined names include:


#### Parameters

##### value `System.String`
The value that configures the name.





### Position(System.String)
Defines the name of the JavaScript function that positions the connector.


#### Parameters

##### value `System.String`
The name of the function that positions the connector.





### Position(System.Func\<System.Object,System.Object\>)
Defines the inline handler that positions the connector.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The inline handler that positions the connector.





### Width(System.Double)
The connector width.


#### Parameters

##### value `System.Double`
The value that configures the width.





### Height(System.Double)
The connector height.


#### Parameters

##### value `System.Double`
The value that configures the height.





### Fill(System.Action\<Kendo.Mvc.UI.Fluent.DiagramFillSettingsBuilder\<T,T\>\>)
Connector's fill options.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramFillSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramFillSettingsBuilder)<T,T>>
The action that configures the fill.





### Stroke(System.Action\<Kendo.Mvc.UI.Fluent.DiagramStrokeSettingsBuilder\<T,T\>\>)
Connector's stroke options.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramStrokeSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramStrokeSettingsBuilder)<T,T>>
The action that configures the stroke.





### Hover(System.Action\<Kendo.Mvc.UI.Fluent.DiagramHoverSettingsBuilder\<T,T\>\>)
Connector's hover options.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramHoverSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramHoverSettingsBuilder)<T,T>>
The action that configures the hover.






