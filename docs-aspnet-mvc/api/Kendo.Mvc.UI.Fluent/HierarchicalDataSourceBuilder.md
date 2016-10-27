---
title: HierarchicalDataSourceBuilder
---

# Kendo.Mvc.UI.Fluent.HierarchicalDataSourceBuilder
Defines the fluent interface for configuring the HierarchicalDataSource.




## Methods


### Custom
Use it to configure Custom binding.





### SignalR
Use it to configure SignalR binding.





### Read(System.Action\<Kendo.Mvc.UI.Fluent.CrudOperationBuilder\>)
Configures the URL for Read operation.





### Read(System.String,System.String,System.Object)
Sets controller, action and routeValues for Read operation.


#### Parameters

##### actionName `System.String`
Action name

##### controllerName `System.String`
Controller Name

##### routeValues `System.Object`
Route values





### Read(System.String,System.String)
Sets controller and action for Read operation.


#### Parameters

##### actionName `System.String`
Action name

##### controllerName `System.String`
Controller Name





### Events(System.Action\<Kendo.Mvc.UI.Fluent.DataSourceEventBuilder\>)
Configures the client-side events





### Model(System.Action\<Kendo.Mvc.UI.Fluent.HierarchicalModelDescriptorBuilder\<System.Object\>\>)
Configures the model





### ServerFiltering
Specifies if filtering should be handled by the server.





### ServerFiltering(System.Boolean)
Specifies if filtering should be handled by the server.






