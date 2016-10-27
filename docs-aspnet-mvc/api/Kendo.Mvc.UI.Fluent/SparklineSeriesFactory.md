---
title: SparklineSeriesFactory
---

# Kendo.Mvc.UI.Fluent.SparklineSeriesFactory
Creates series for the 1.



## Properties


### Container

The parent Sparkline




## Methods


### Bar(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound bar series.


#### Parameters

##### valueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point value from the chart model

##### colorExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point color from the chart model

##### categoryExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point category from the chart model





### Bar(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound bar series.


#### Parameters

##### valueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point value from the chart model

##### colorExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point color from the chart model





### Bar(System.String,System.String,System.String,System.String)
Defines bound bar series.


#### Parameters

##### valueMemberName `System.String`
The name of the value member.

##### colorMemberName `System.String`
The name of the color member.

##### categoryMemberName `System.String`
The name of the category member.

##### noteTextMemberName `System.String`
The name of the note text member.





### Bar(System.Type,System.String,System.String,System.String,System.String)
Defines bound bar series.


#### Parameters

##### memberType `System.Type`
The type of the value member.

##### valueMemberName `System.String`
The name of the value member.

##### colorMemberName `System.String`
The name of the color member.

##### categoryMemberName `System.String`
The name of the category member.

##### noteTextMemberName `System.String`
The name of the note text member.





### Bar(System.Collections.IEnumerable)
Defines bar series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to.





### Column(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound column series.


#### Parameters

##### valueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point value from the chart model

##### colorExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point color from the chart model

##### categoryExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point category from the chart model

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point note text from the chart model





### Column(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound column series.


#### Parameters

##### valueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point value from the chart model

##### colorExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point color from the chart model





### Column(System.String,System.String,System.String,System.String)
Defines bound bar series.


#### Parameters

##### valueMemberName `System.String`
The name of the value member.

##### colorMemberName `System.String`
The name of the color member.

##### categoryMemberName `System.String`
The name of the category member.

##### noteTextMemberName `System.String`
The name of the note text member.





### Column(System.Type,System.String,System.String,System.String,System.String)
Defines bound bar series.


#### Parameters

##### memberType `System.Type`
The type of the value member.

##### valueMemberName `System.String`
The name of the value member.

##### colorMemberName `System.String`
The name of the color member.

##### categoryMemberName `System.String`
The name of the category member.





### Column(System.Collections.IEnumerable)
Defines bar series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to





### Line(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound line series.


#### Parameters

##### expression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the value from the chart model.

##### categoryExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the category from the chart model.

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the note text from the chart model.





### Line(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>)
Defines bound line series.


#### Parameters

##### expression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the series value from the chart model





### Line(System.String,System.String)
Defines bound line series.


#### Parameters

##### memberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.





### Line(System.Type,System.String,System.String,System.String)
Defines bound line series.


#### Parameters

##### memberType `System.Type`
The type of the value member.

##### memberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.





### Line(System.Collections.IEnumerable)
Defines line series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to





### Area(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>)
Defines bound area series.


#### Parameters

##### expression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the value from the chart model.





### Area(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound area series.


#### Parameters

##### expression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the value from the chart model.

##### categoryExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the category from the chart model.

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the note text from the chart model.





### Area(System.String,System.String)
Defines bound area series.


#### Parameters

##### memberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.





### Area(System.Type,System.String,System.String,System.String)
Defines bound area series.


#### Parameters

##### memberType `System.Type`
The type of the value member.

##### memberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.





### Area(System.Collections.IEnumerable)
Defines area series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to





### Pie(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.Boolean\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.Boolean\>\>)
Defines bound pie series.





### Pie(System.String,System.String,System.String,System.String,System.String)
Defines bound pie series.





### Pie(System.Type,System.String,System.String,System.String,System.String,System.String)
Defines bound pie series.





### Pie(System.Collections.IEnumerable)
Defines pie series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to





### Bullet(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound bullet series.


#### Parameters

##### currentExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point current value from the chart model

##### targetExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point target value from the chart model

##### colorExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point color from the chart model

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point note text from the chart model





### Bullet(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound bullet series.


#### Parameters

##### currentExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point current value from the chart model

##### targetExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point target value from the chart model

##### colorExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point color from the chart model

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point note text from the chart model





### Bullet(System.String,System.String,System.String,System.String,System.String)
Defines bound bar series.


#### Parameters

##### currentMemberName `System.String`
The name of the current value member.

##### targetMemberName `System.String`
The name of the target value member.

##### colorMemberName `System.String`
The name of the color member.

##### noteTextExpression `System.String`
The name of the note text member.





### Bullet(System.Type,System.String,System.String,System.String,System.String,System.String)
Defines bound bullet series.


#### Parameters

##### currentMemberType `System.Type`
The type of the current value member.

##### targetMemberName `System.String`
The name of the target value member.

##### colorMemberName `System.String`
The name of the color member.

##### noteTextExpression `System.String`
The name of the note text member.






