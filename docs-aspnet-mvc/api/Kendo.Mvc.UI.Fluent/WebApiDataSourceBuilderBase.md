---
title: WebApiDataSourceBuilderBase
---

# Kendo.Mvc.UI.Fluent.WebApiDataSourceBuilderBase
Defines the fluent interface for configuring the DataSource options.




## Methods


### Events(System.Action\<Kendo.Mvc.UI.Fluent.DataSourceEventBuilder\>)
Configures the client-side events





### Read(System.Action\<Kendo.Mvc.UI.Fluent.CrudOperationBuilder\>)
Configures the URL for Read operation.





### Read(System.String)
Sets controller and action for Read operation.


#### Parameters

##### url `System.String`
Absolute or relative URL for the operation





### Total(System.Int32)
Sets the total number of records in the data source. Required during Custom binding.


#### Parameters

##### total `System.Int32`
Number of records





### PageSize(System.Int32)
Sets the number of records displayed on a single page.


#### Parameters

##### pageSize `System.Int32`






### ServerOperation(System.Boolean)
Sets the operation mode of the DataSource. 
            By default the DataSource will make a request to the server when data for paging, sorting, 
            filtering or grouping is needed. If set to false all data will be requested through single request. 
            Any other paging, sorting, filtering or grouping will be performed client-side.


#### Parameters

##### enabled `System.Boolean`
True(default) if server operation mode is enabled, otherwise false.





### Sort(System.Action\<Kendo.Mvc.UI.Fluent.DataSourceSortDescriptorFactory\<T\>\>)
Configures the initial sorting.





### Group(System.Action\<Kendo.Mvc.UI.Fluent.DataSourceGroupDescriptorFactory\<T\>\>)
Configures the initial grouping.





### Aggregates(System.Action\<Kendo.Mvc.UI.Fluent.DataSourceAggregateDescriptorFactory\<T\>\>)
Configures the initial aggregates.





### Filter(System.Action\<Kendo.Mvc.UI.Fluent.DataSourceFilterDescriptorFactory\<T\>\>)
Configures the initial filter.





### Model(System.Action\<Kendo.Mvc.UI.Fluent.DataSourceModelDescriptorFactory\<T\>\>)
Configures Model properties






