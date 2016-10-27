---
title: DataSourceTreeListModelDescriptorFactory
---

# Kendo.Mvc.UI.Fluent.DataSourceTreeListModelDescriptorFactory
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





### ParentId(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>)
Specify the member used for the parentId field.


#### Parameters

##### expression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
Member access expression which describes the member





### ParentId(System.String)
Specify the member used for the parentId field.


#### Parameters

##### fieldName `System.String`
The member name.





### Expanded(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>)
Specify the member used for the expanded field.


#### Parameters

##### expression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
Member access expression which describes the member





### Expanded(System.String)
Specify the member used for the expanded field.


#### Parameters

##### fieldName `System.String`
The member name.





### Expanded(System.Boolean)
Specify the default value of the expanded field.


#### Parameters

##### fieldName `System.Boolean`
The member name.





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






