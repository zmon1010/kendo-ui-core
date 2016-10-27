---
title: DiagramConnectionBuilder
---

# Kendo.Mvc.UI.Fluent.DiagramConnectionBuilder
Defines the fluent API for configuring the DiagramConnection settings.




## Methods


### Content(System.Action\<Kendo.Mvc.UI.Fluent.DiagramConnectionContentSettingsBuilder\<T,T\>\>)
Defines the shapes content settings.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramConnectionContentSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramConnectionContentSettingsBuilder)<T,T>>
The action that configures the content.





### Editable(System.Boolean)
Defines the shape editable options.


#### Parameters

##### enabled `System.Boolean`
Enables or disables the editable option.





### Editable(System.Action\<Kendo.Mvc.UI.Fluent.DiagramConnectionEditableSettingsBuilder\<T,T\>\>)
Defines the shape editable options.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramConnectionEditableSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramConnectionEditableSettingsBuilder)<T,T>>
The action that configures the editable.





### EndCap(System.String)
The connection end cap type.


#### Parameters

##### type `System.String`
The end cap type.





### EndCap(System.Action\<Kendo.Mvc.UI.Fluent.DiagramConnectionEndCapSettingsBuilder\<T,T\>\>)
The connection end cap configuration or type name.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramConnectionEndCapSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramConnectionEndCapSettingsBuilder)<T,T>>
The action that configures the endcap.





### From(System.Action\<Kendo.Mvc.UI.Fluent.DiagramConnectionFromSettingsBuilder\<T,T\>\>)
Defines the source of the connection.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramConnectionFromSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramConnectionFromSettingsBuilder)<T,T>>
The action that configures the from.





### Hover(System.Action\<Kendo.Mvc.UI.Fluent.DiagramConnectionHoverSettingsBuilder\<T,T\>\>)
Defines the hover configuration.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramConnectionHoverSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramConnectionHoverSettingsBuilder)<T,T>>
The action that configures the hover.





### Points(System.Action\<Kendo.Mvc.UI.Fluent.DiagramConnectionPointFactory\<T,T\>\>)
Sets the intermediate points (in global coordinates) of the connection. It's important to note that currently these points cannot be manipulated in the interface.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramConnectionPointFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramConnectionPointFactory)<T,T>>
The action that configures the points.





### Selection(System.Action\<Kendo.Mvc.UI.Fluent.DiagramConnectionSelectionSettingsBuilder\<T,T\>\>)
Defines the connection selection configuration.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramConnectionSelectionSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramConnectionSelectionSettingsBuilder)<T,T>>
The action that configures the selection.





### StartCap(System.String)
The connection start cap type.


#### Parameters

##### type `System.String`
The start cap type.





### StartCap(System.Action\<Kendo.Mvc.UI.Fluent.DiagramConnectionStartCapSettingsBuilder\<T,T\>\>)
The connection start cap configuration or type name.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramConnectionStartCapSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramConnectionStartCapSettingsBuilder)<T,T>>
The action that configures the startcap.





### Stroke(System.Action\<Kendo.Mvc.UI.Fluent.DiagramConnectionStrokeSettingsBuilder\<T,T\>\>)
Defines the stroke configuration.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramConnectionStrokeSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramConnectionStrokeSettingsBuilder)<T,T>>
The action that configures the stroke.





### To(System.Action\<Kendo.Mvc.UI.Fluent.DiagramConnectionToSettingsBuilder\<T,T\>\>)
Defines the connection to.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramConnectionToSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramConnectionToSettingsBuilder)<T,T>>
The action that configures the to.





### Type(Kendo.Mvc.UI.DiagramConnectionType)
The connection type.


#### Parameters

##### value [Kendo.Mvc.UI.DiagramConnectionType](/api/aspnet-mvc/Kendo.Mvc.UI/DiagramConnectionType)
The value that configures the type.





### FromConnector(System.String)
The default source connector.


#### Parameters

##### value `System.String`
The value that configures the default source connector.





### ToConnector(System.String)
The default target connector.


#### Parameters

##### value `System.String`
The value that configures the default target connector.






