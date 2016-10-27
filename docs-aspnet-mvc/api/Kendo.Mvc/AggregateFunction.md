---
title: AggregateFunction
---

# Kendo.Mvc.AggregateFunction
Represents an aggregate function.



## Properties


### Caption

Gets or sets the informative message to display as an illustration of the aggregate function.

### SourceField

Gets or sets the name of the field, of the item from the set of items, which value is used as the argument of the aggregate function.

### FunctionName

Gets or sets the name of the aggregate function, which appears as a property of the group record on which records the function works.

### ResultFormatString

Gets or sets a string that is used to format the result value.




## Methods


### CreateAggregateExpression(System.Linq.Expressions.Expression,System.Boolean)
Creates the aggregate expression that is used for constructing expression
            tree that will calculate the aggregate result.


#### Parameters

##### enumerableExpression `System.Linq.Expressions.Expression`
The grouping expression.

##### liftMemberAccessToNull `System.Boolean`




#### Returns




### GenerateFunctionName
Generates default name for this function using this type's name.



#### Returns
Function name generated with the following pattern:
            {GetType.Name}_{GetHashCode}




