---
title: CustomHierarchicalDataSourceModelDescriptorFactory
---

# Kendo.Mvc.UI.Fluent.CustomHierarchicalDataSourceModelDescriptorFactory
Defines the fluent interface for configuring the DataSource Model definition.




## Methods


### Id(System.String)
Specify the member used to identify an unique Model instance.


#### Parameters

##### fieldName `System.String`
The member name.





### Children(System.String)
Specify the model children member name.


#### Parameters

##### fieldName `System.String`
The member name.





### Children(System.Action\<Kendo.Mvc.UI.Fluent.HierarchicalDataSourceBuilder\<System.Object\>\>)
Specify the children DataSource configuration.


#### Parameters

##### fieldName System.Action<[Kendo.Mvc.UI.Fluent.HierarchicalDataSourceBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/HierarchicalDataSourceBuilder)<System.Object>>
The configurator action.





### HasChildren(System.String)
Specify the member name used to determine if the model has children.


#### Parameters

##### fieldName `System.String`
The member name.





### Field(System.String,System.Type)
Describes a Model field


#### Parameters

##### memberName `System.String`
Field name

##### memberType `System.Type`
Field type






