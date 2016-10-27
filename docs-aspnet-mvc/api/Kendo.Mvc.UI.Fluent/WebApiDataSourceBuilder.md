---
title: WebApiDataSourceBuilder
---

# Kendo.Mvc.UI.Fluent.WebApiDataSourceBuilder
Defines the fluent interface for configuring the DataSource WebApi create/update/destroy operation bindings.




## Methods


### Update(System.Action\<Kendo.Mvc.UI.Fluent.CrudOperationBuilder\>)
Configures the URL for Update operation.





### Update(System.String)
Sets controller, action and routeValues for Update operation.


#### Parameters

##### url `System.String`
Absolute or relative URL for the operation





### Create(System.Action\<Kendo.Mvc.UI.Fluent.CrudOperationBuilder\>)
Configures the URL for Create operation.





### Create(System.String)
Sets controller, action and routeValues for Create operation.


#### Parameters

##### url `System.String`
Absolute or relative URL for the operation





### Destroy(System.Action\<Kendo.Mvc.UI.Fluent.CrudOperationBuilder\>)
Configures the URL for Destroy operation.





### Destroy(System.String)
Sets controller and action for Destroy operation.


#### Parameters

##### url `System.String`
Absolute or relative URL for the operation





### AutoSync(System.Boolean)
Determines if data source would automatically sync any changes to its data items. By default changes are not automatically sync-ed.


#### Parameters

##### enabled `System.Boolean`
If true changes will be automatically synced, otherwise false.






