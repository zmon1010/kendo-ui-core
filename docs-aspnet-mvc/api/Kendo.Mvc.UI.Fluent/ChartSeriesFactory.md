---
title: ChartSeriesFactory
---

# Kendo.Mvc.UI.Fluent.ChartSeriesFactory
Creates series for the 1.



## Properties


### Container

The parent Chart




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

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point note text from the chart model





### Bar(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound bar series.


#### Parameters

##### valueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point value from the chart model

##### colorExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point color from the chart model

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point note text from the chart model





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





### Column(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound column series.


#### Parameters

##### valueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point value from the chart model

##### colorExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point color from the chart model

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point note text from the chart model





### Column(System.String,System.String,System.String,System.String)
Defines bound column series.


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
Defines bound column series.


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





### Column(System.Collections.IEnumerable)
Defines column series bound to inline data.


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





### Line(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound line series.


#### Parameters

##### expression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the value from the chart model.

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the note text from the chart model.





### Line(System.String,System.String,System.String)
Defines bound line series.


#### Parameters

##### memberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.

##### noteTextMemberName `System.String`
The name of the note text member.





### Line(System.Type,System.String,System.String,System.String)
Defines bound line series.


#### Parameters

##### memberType `System.Type`
The type of the value member.

##### memberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.

##### noteTextMemberName `System.String`
The name of the note text member.





### Line(System.Collections.IEnumerable)
Defines line series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to





### VerticalLine(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound vertical line series.


#### Parameters

##### expression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the value from the chart model.

##### categoryExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the category from the chart model.

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the note text from the chart model.





### VerticalLine(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound vertical line series.


#### Parameters

##### expression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the value from the chart model.

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the note text from the chart model.





### VerticalLine(System.String,System.String,System.String)
Defines bound vertical line series.


#### Parameters

##### memberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.

##### noteTextMemberName `System.String`
The name of the note text member.





### VerticalLine(System.Type,System.String,System.String,System.String)
Defines bound vertical line series.


#### Parameters

##### memberType `System.Type`
The type of the value member.

##### memberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.

##### noteTextMemberName `System.String`
The name of the note text member.





### VerticalLine(System.Collections.IEnumerable)
Defines vertical line series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to





### Area(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound area series.


#### Parameters

##### expression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the value from the chart model.

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the note text from the chart model.





### Area(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound area series.


#### Parameters

##### expression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the value from the chart model.

##### categoryExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the category from the chart model.

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the note text from the chart model.





### Area(System.String,System.String,System.String)
Defines bound area series.


#### Parameters

##### memberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.

##### noteTextMemberName `System.String`
The name of the note text member.





### Area(System.Type,System.String,System.String,System.String)
Defines bound area series.


#### Parameters

##### memberType `System.Type`
The type of the value member.

##### memberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.

##### noteTextMemberName `System.String`
The name of the note text member.





### Area(System.Collections.IEnumerable)
Defines area series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to





### VerticalArea(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound vertical area series.


#### Parameters

##### expression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the value from the chart model.

##### categoryExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the category from the chart model.

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the note text from the chart model.





### VerticalArea(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound vertical area series.


#### Parameters

##### expression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the value from the chart model.

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the note text from the chart model.





### VerticalArea(System.String,System.String,System.String)
Defines bound vertical area series.


#### Parameters

##### memberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.

##### noteTextMemberName `System.String`
The name of the note text member.





### VerticalArea(System.Type,System.String,System.String,System.String)
Defines bound vertical area series.


#### Parameters

##### memberType `System.Type`
The type of the value member.

##### memberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.

##### noteTextMemberName `System.String`
The name of the note text member.





### VerticalArea(System.Collections.IEnumerable)
Defines vertical area series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to





### Scatter(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound scatter series.


#### Parameters

##### xValueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the X value from the chart model

##### yValueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the Y value from the chart model

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the note text from the chart model





### Scatter(System.String,System.String,System.String)
Defines bound scatter series.


#### Parameters

##### xMemberName `System.String`
The name of the X value member.

##### yMemberName `System.String`
The name of the Y value member.

##### noteTextMemberName `System.String`
The name of the note text member.





### Scatter(System.Type,System.String,System.String,System.String)
Defines bound scatter series.


#### Parameters

##### memberType `System.Type`
The type of the value members.

##### xMemberName `System.String`
The name of the X value member.

##### yMemberName `System.String`
The name of the Y value member.

##### noteTextMemberName `System.String`
The name of the note text member.





### Scatter(System.Collections.IEnumerable)
Defines scatter series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to





### ScatterLine(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound scatter line series.


#### Parameters

##### xValueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the X value from the chart model

##### yValueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the Y value from the chart model

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the Y value from the chart model





### ScatterLine(System.String,System.String,System.String)
Defines bound scatter line series.


#### Parameters

##### xMemberName `System.String`
The name of the X value member.

##### yMemberName `System.String`
The name of the Y value member.

##### noteTextExpression `System.String`
The name of the Y value member.





### ScatterLine(System.Type,System.String,System.String,System.String)
Defines bound scatter line series.


#### Parameters

##### memberType `System.Type`
The type of the value members.

##### xMemberName `System.String`
The name of the X value member.

##### yMemberName `System.String`
The name of the Y value member.

##### noteTextExpression `System.String`
The name of the Y value member.





### ScatterLine(System.Collections.IEnumerable)
Defines scatter line series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to





### Bubble(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.Boolean\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound bubble series.





### Bubble(System.String,System.String,System.String,System.String,System.String,System.String,System.String)
Defines bound bubble series.





### Bubble(System.Type,System.String,System.String,System.String,System.String,System.String,System.String,System.String)
Defines bound bubble series.





### Bubble(System.Collections.IEnumerable)
Defines bubble series bound to inline data.


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





### Funnel(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.Boolean\>\>)
Defines bound funnel series.





### Funnel(System.String,System.String,System.String,System.String)
Defines bound funnel series.





### Funnel(System.Type,System.String,System.String,System.String,System.String)
Defines bound funnel series.





### Funnel(System.Collections.IEnumerable)
Defines funnel series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to





### Donut(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.Boolean\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.Boolean\>\>)
Defines bound Donut series.





### Donut(System.String,System.String,System.String,System.String,System.String)
Defines bound donut series.





### Donut(System.Type,System.String,System.String,System.String,System.String,System.String)
Defines bound donut series.





### Donut(System.Collections.IEnumerable)
Defines donut series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to





### OHLC(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound ohlc series.





### OHLC(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound ohlc series.





### OHLC(System.String,System.String,System.String,System.String,System.String,System.String,System.String)
Defines bound ohlc series.





### OHLC(System.Type,System.String,System.String,System.String,System.String,System.String,System.String,System.String)
Defines bound ohlc series.





### OHLC(System.Collections.IEnumerable)
Defines ohlc series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to





### Candlestick(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound candlestick series.





### Candlestick(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound candlestick series.





### Candlestick(System.String,System.String,System.String,System.String,System.String,System.String,System.String,System.String)
Defines bound candlestick series.





### Candlestick(System.Type,System.String,System.String,System.String,System.String,System.String,System.String,System.String,System.String)
Defines bound candlestick series.





### Candlestick(System.Collections.IEnumerable)
Defines candlestick series bound to inline data.


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

##### categoryExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point category from the chart model

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
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

##### noteTextMemberName `System.String`
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





### Bullet(System.Collections.IEnumerable)
Defines bar series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to.





### VerticalBullet(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound verticalBullet series.


#### Parameters

##### currentExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point current value from the chart model

##### targetExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point target value from the chart model

##### colorExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point color from the chart model

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point note text from the chart model





### VerticalBullet(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound verticalBullet series.


#### Parameters

##### currentExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point current value from the chart model

##### targetExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point target value from the chart model

##### colorExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point color from the chart model

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point note text from the chart model





### VerticalBullet(System.String,System.String,System.String,System.String,System.String)
Defines bound verticalBullet series.


#### Parameters

##### currentMemberName `System.String`
The name of the current value member.

##### targetMemberName `System.String`
The name of the target value member.

##### colorMemberName `System.String`
The name of the color member.

##### noteTextMemberName `System.String`
The name of the color member.





### VerticalBullet(System.Type,System.String,System.String,System.String,System.String,System.String)
Defines bound verticalBullet series.


#### Parameters

##### currentMemberType `System.Type`
The type of the current value member.

##### targetMemberName `System.String`
The name of the target value member.

##### colorMemberName `System.String`
The name of the color member.

##### noteTextMemberName `System.String`
The name of the color member.





### VerticalBullet(System.Collections.IEnumerable)
Defines bar series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to





### RadarArea(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>)
Defines bound radar area series.


#### Parameters

##### valueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point value from the chart model





### RadarArea(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound radar area series.


#### Parameters

##### valueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point value from the chart model

##### categoryExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point category from the chart model

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point note text from the chart model





### RadarArea(System.String,System.String,System.String)
Defines bound radar area series.


#### Parameters

##### valueMemberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.

##### noteTextMemberName `System.String`
The name of the note text member.





### RadarArea(System.Type,System.String,System.String,System.String)
Defines bound radar area series.


#### Parameters

##### memberType `System.Type`
The type of the value member.

##### valueMemberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.

##### noteTextMemberName `System.String`
The name of the note text member.





### RadarArea(System.Collections.IEnumerable)
Defines radar area series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to.





### RadarColumn(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound radar column series.


#### Parameters

##### valueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point value from the chart model

##### colorExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point color from the chart model

##### categoryExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point category from the chart model

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point note text from the chart model





### RadarColumn(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound radar column series.


#### Parameters

##### valueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point value from the chart model

##### colorExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point color from the chart model

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point note text from the chart model





### RadarColumn(System.String,System.String,System.String,System.String)
Defines bound radar column series.


#### Parameters

##### valueMemberName `System.String`
The name of the value member.

##### colorMemberName `System.String`
The name of the color member.

##### categoryMemberName `System.String`
The name of the category member.

##### noteTextMemberName `System.String`
The name of the note text member.





### RadarColumn(System.Type,System.String,System.String,System.String,System.String)
Defines bound radar column series.


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





### RadarColumn(System.Collections.IEnumerable)
Defines radar column series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to.





### RadarLine(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>)
Defines bound radar line series.


#### Parameters

##### valueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point value from the chart model





### RadarLine(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound radar line series.


#### Parameters

##### valueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point value from the chart model

##### categoryExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point category from the chart model

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point note text from the chart model





### RadarLine(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound radar line series.


#### Parameters

##### valueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point value from the chart model

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point note text from the chart model





### RadarLine(System.String,System.String,System.String)
Defines bound radar line series.


#### Parameters

##### valueMemberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.

##### noteTextMemberName `System.String`
The name of the category member.





### RadarLine(System.Type,System.String,System.String,System.String)
Defines bound radar line series.


#### Parameters

##### memberType `System.Type`
The type of the value member.

##### valueMemberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.

##### noteTextMemberName `System.String`
The name of the note text member.





### RadarLine(System.Collections.IEnumerable)
Defines radar line series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to.





### PolarArea(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound polar area series.


#### Parameters

##### xValueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the X value from the chart model

##### yValueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the Y value from the chart model

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the note text from the chart model





### PolarArea(System.String,System.String,System.String)
Defines bound polar area series.


#### Parameters

##### xMemberName `System.String`
The name of the X value member.

##### yMemberName `System.String`
The name of the Y value member.

##### noteTextMemberName `System.String`
The name of the note text member.





### PolarArea(System.Type,System.String,System.String,System.String)
Defines bound polar area series.


#### Parameters

##### memberType `System.Type`
The type of the value members.

##### xMemberName `System.String`
The name of the X value member.

##### yMemberName `System.String`
The name of the Y value member.

##### noteTextMemberName `System.String`
The name of the note text member.





### PolarArea(System.Collections.IEnumerable)
Defines polar area series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to





### PolarLine(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound polar line series.


#### Parameters

##### xValueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the X value from the chart model

##### yValueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the Y value from the chart model

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the note text from the chart model





### PolarLine(System.String,System.String,System.String)
Defines bound polar line series.


#### Parameters

##### xMemberName `System.String`
The name of the X value member.

##### yMemberName `System.String`
The name of the Y value member.

##### noteTextMemberName `System.String`
The name of the note text member.





### PolarLine(System.Type,System.String,System.String,System.String)
Defines bound polar line series.


#### Parameters

##### memberType `System.Type`
The type of the value members.

##### xMemberName `System.String`
The name of the X value member.

##### yMemberName `System.String`
The name of the Y value member.





### PolarLine(System.Collections.IEnumerable)
Defines polar line series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to





### PolarScatter(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound polar scatter series.


#### Parameters

##### xValueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the X value from the chart model

##### yValueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the Y value from the chart model

##### noteTextExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the note text from the chart model





### PolarScatter(System.String,System.String,System.String)
Defines bound polar scatter series.


#### Parameters

##### xMemberName `System.String`
The name of the X value member.

##### yMemberName `System.String`
The name of the Y value member.

##### noteTextMemberName `System.String`
The name of the note text member.





### PolarScatter(System.Type,System.String,System.String,System.String)
Defines bound polar scatter series.


#### Parameters

##### memberType `System.Type`
The type of the value members.

##### xMemberName `System.String`
The name of the X value member.

##### yMemberName `System.String`
The name of the Y value member.

##### noteTextMemberName `System.String`
The name of the note text member.





### PolarScatter(System.Collections.IEnumerable)
Defines polar scatter series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to





### BoxPlot(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.Collections.Generic.IList\<T1\>\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound box plot series.





### BoxPlot(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.Collections.Generic.IList\<T1\>\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound box plot series.





### BoxPlot(System.String,System.String,System.String,System.String,System.String,System.String,System.String,System.String,System.String,System.String)
Defines bound box plot series.





### BoxPlot(System.Type,System.String,System.String,System.String,System.String,System.String,System.String,System.String,System.String,System.String,System.String)
Defines bound box plot series.





### BoxPlot(System.Collections.IEnumerable)
Defines box plot series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to





### VerticalBoxPlot(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.Collections.Generic.IList\<T1\>\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound vertical box plot series.





### VerticalBoxPlot(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.Collections.Generic.IList\<T1\>\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound box plot series.





### VerticalBoxPlot(System.String,System.String,System.String,System.String,System.String,System.String,System.String,System.String,System.String,System.String)
Defines bound box plot series.





### VerticalBoxPlot(System.Type,System.String,System.String,System.String,System.String,System.String,System.String,System.String,System.String,System.String,System.String)
Defines bound box plot series.





### VerticalBoxPlot(System.Collections.IEnumerable)
Defines box plot series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to





### Waterfall(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound waterfall series.


#### Parameters

##### valueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point value from the chart model

##### categoryExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point category from the chart model

##### summaryExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point summary type from the chart model





### Waterfall(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>)
Defines bound waterfall series.


#### Parameters

##### valueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point value from the chart model





### Waterfall(System.String,System.String,System.String)
Defines bound waterfall series.


#### Parameters

##### valueMemberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.

##### summaryMemberName `System.String`
The name of the note summary type member.





### Waterfall(System.Type,System.String,System.String,System.String)
Defines bound waterfall series.


#### Parameters

##### memberType `System.Type`
The type of the value member.

##### valueMemberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.

##### summaryMemberName `System.String`
The name of the note summary type member.





### Waterfall(System.Collections.IEnumerable)
Defines waterfall series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to.





### HorizontalWaterfall(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>,System.Linq.Expressions.Expression\<System.Func\<T,System.String\>\>)
Defines bound horizontal waterfall series.


#### Parameters

##### valueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point value from the chart model

##### categoryExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point category from the chart model

##### summaryExpression `System.Linq.Expressions.Expression<System.Func<T,System.String>>`
The expression used to extract the point summary type from the chart model





### HorizontalWaterfall(System.Linq.Expressions.Expression\<System.Func\<T,T1\>\>)
Defines bound horizontal waterfall series.


#### Parameters

##### valueExpression `System.Linq.Expressions.Expression<System.Func<T,T1>>`
The expression used to extract the point value from the chart model





### HorizontalWaterfall(System.String,System.String,System.String)
Defines bound horizontal waterfall series.


#### Parameters

##### valueMemberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.

##### summaryMemberName `System.String`
The name of the note summary type member.





### HorizontalWaterfall(System.Type,System.String,System.String,System.String)
Defines bound horizontal waterfall series.


#### Parameters

##### memberType `System.Type`
The type of the value member.

##### valueMemberName `System.String`
The name of the value member.

##### categoryMemberName `System.String`
The name of the category member.

##### summaryMemberName `System.String`
The name of the note summary type member.





### HorizontalWaterfall(System.Collections.IEnumerable)
Defines horizontal waterfall series bound to inline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data to bind to.






