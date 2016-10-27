---
title: CustomDataSourceModelDescriptorFactory
---

# Kendo.Mvc.UI.Fluent.CustomDataSourceModelDescriptorFactory
Defines the fluent interface for configuring the DataSource Model definition.




## Methods


### Id(System.String)
Specify the member used to identify an unique Model instance.


#### Parameters

##### fieldName `System.String`
The member name.





### Id(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>)
Specify the member used to identify an unique Model instance.


#### Parameters

##### expression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
Member access expression which describes the member





### Field(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>)
Describes a Model field


#### Parameters

##### expression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
Member access expression which describes the field





### Field(System.String,System.Type)
Describes a Model field


#### Parameters

##### memberName `System.String`
Field name

##### memberType `System.Type`
Field type





### Field(System.String)
Describes a Model field


#### Parameters

##### memberName `System.String`
Member name





### ClearFields
Clears all Model fields.






