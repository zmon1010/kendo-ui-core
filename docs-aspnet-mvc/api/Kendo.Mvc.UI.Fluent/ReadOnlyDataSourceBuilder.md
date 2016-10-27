---
title: ReadOnlyDataSourceBuilder
---

# Kendo.Mvc.UI.Fluent.ReadOnlyDataSourceBuilder
Defines the fluent interface for configuring the DataSource when in read-only mode.




## Methods


### Read(System.Action\<Kendo.Mvc.UI.Fluent.CrudOperationBuilder\>)
Configures the URL for Read operation.





### Read(System.String,System.String,System.Object)
Sets controller and action for Read operation.


#### Parameters

##### actionName `System.String`
Action name

##### controllerName `System.String`
Controller Name

##### routeValues `System.Object`
Route values





### Read(System.String,System.String)
Sets controller, action and routeValues for Read operation.


#### Parameters

##### actionName `System.String`
Action name

##### controllerName `System.String`
Controller Name





### ServerFiltering
Specifies if filtering should be handled by the server.





### ServerFiltering(System.Boolean)
Specifies if filtering should be handled by the server.





### Events(System.Action\<Kendo.Mvc.UI.Fluent.DataSourceEventBuilder\>)
Configures the client-side events





### Custom
Use it to configure Custom binding.





### SignalR
Use it to configure SignalR binding.






